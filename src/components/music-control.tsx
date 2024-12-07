import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
} from "lucide-react";
import { Slider } from "./ui/slider";
import { calculateSliderValue, cn, formatTime } from "@/lib/utils";
import { Button } from "./ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMusicPlayerStore } from "@/hooks/use-music-player-store";
import { useSongQuery } from "@/api/hooks/useSong";
import { usePlaylistQuery, useShufflePlaylist } from "@/api/hooks/usePlaylist";
import { useRecentlyPlayed } from "@/hooks/use-recently-played";

export const MusicControl = () => {
  const { songId, isPlaying, playlistId, setSongId, setIsPlaying } =
    useMusicPlayerStore();
  const { data: song } = useSongQuery(songId);
  const { data: playlist } = usePlaylistQuery(playlistId);
  const shufflePlaylist = useShufflePlaylist(playlistId);
  const [currentTime, setCurrentTime] = useState(0);
  const [playMode, setPlayMode] = useState<"normal" | "repeat" | "repeat-one">(
    "normal"
  );
  const totalDuration = song?.duration || 0;
  const { addOrUpdateSong } = useRecentlyPlayed();

  useEffect(() => {
    setCurrentTime(0);
  }, [song]);

  useEffect(() => {
    if (song) addOrUpdateSong(song);
  }, [addOrUpdateSong, song]);

  const getPlayModeIndicator = () => {
    let children = <Repeat className="h-4 w-4" />;
    switch (playMode) {
      case "repeat-one":
        children = (
          <div>
            <Repeat className="h-4 w-4" />
            <span className="absolute text-xs bottom-1 right-2">1</span>
          </div>
        );
        break;
    }
    return (
      <Button
        onClick={togglePlayMode}
        variant="ghost"
        size="icon"
        className={cn("relative", playMode !== "normal" && "bg-accent")}
      >
        {children}
      </Button>
    );
  };

  useEffect(() => {
    if (!audioElement.current) return;

    if (song && song.url) {
      audioElement.current.src = song.url;
      audioElement.current.load();

      if (isPlaying) {
        audioElement.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [song, isPlaying, setIsPlaying]);

  const nextSong = useCallback(() => {
    if (!playlist) {
      if (playMode !== "normal") {
        setCurrentTime(0);
        setIsPlaying(true);
      }
      return;
    }

    if (!playlist || playlist.songs.length === 0) return;
    const currentIndex = playlist.songs.findIndex((s) => s.id === songId);

    if (currentIndex === playlist.songs.length - 1) {
      setIsPlaying(false);
      return;
    }
    let nextIndex = (currentIndex + 1) % playlist.songs.length;

    if (playMode === "repeat-one") {
      nextIndex = currentIndex; // Stay on the same song
    }

    const nextSong = playlist.songs[nextIndex];
    addOrUpdateSong(nextSong);
    setSongId(nextSong.id);
  }, [playlist, playMode, addOrUpdateSong, setSongId, setIsPlaying, songId]);

  useEffect(() => {
    if (!audioElement.current) return;

    let intervalId: NodeJS.Timeout;

    if (isPlaying) {
      intervalId = setInterval(() => {
        const newTime = Math.min(currentTime + 1, song?.duration || 0);
        setCurrentTime(newTime);

        if (newTime >= (song?.duration || 0)) {
          setIsPlaying(false);
          nextSong();
        }
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, currentTime, song, nextSong, setIsPlaying, setCurrentTime]);

  const prevSong = useCallback(() => {
    if (!playlist || playlist.songs.length === 0) return;

    const currentIndex = playlist.songs.findIndex((s) => s.id === songId);
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : playlist.songs.length - 1;

    const prevSong = playlist.songs[prevIndex];
    setSongId(prevSong.id);
    addOrUpdateSong(prevSong);
  }, [playlist, setSongId, addOrUpdateSong, songId]);

  const playPause = () => {
    if (song && currentTime === song.duration && !isPlaying) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const togglePlayMode = () => {
    const modes = ["normal", "repeat", "repeat-one"];
    const currentIndex = modes.indexOf(playMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setPlayMode(modes[nextIndex] as "normal" | "repeat" | "repeat-one");
  };

  const randomSong = () => {
    if (!playlist || playlist.songs.length === 0) return;
    const shuffledSongs = shufflePlaylist();
    const randomSong = shuffledSongs[0];
    setSongId(randomSong.id);
  };
  const audioElement = useRef<HTMLAudioElement | null>(null);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-2">
      <audio ref={audioElement} />
      <div className="flex items-center space-x-4">
        <Button
          onClick={randomSong}
          variant="ghost"
          size="icon"
          disabled={!playlist}
        >
          <Shuffle className="h-4 w-4" />
        </Button>
        <Button
          onClick={prevSong}
          variant="ghost"
          size="icon"
          disabled={!playlist}
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button onClick={playPause} size="icon">
          {isPlaying && song ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        <Button
          onClick={nextSong}
          variant="ghost"
          size="icon"
          disabled={!playlist}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
        {getPlayModeIndicator()}
      </div>

      <div
        className={cn(
          "flex items-center space-x-2 px-7 w-[100%] h-4",
          song && "w-[121%] px-0"
        )}
      >
        {song && (
          <span className="text-xs w-12 text-right">
            {formatTime(currentTime)}
          </span>
        )}
        <Slider
          className="flex-1"
          value={[calculateSliderValue(currentTime, totalDuration)]}
          onValueChange={(value) =>
            setCurrentTime((value[0] * totalDuration) / 100)
          }
          max={100}
          step={1}
        />
        {song && (
          <span className="text-xs w-12">{formatTime(totalDuration)}</span>
        )}
      </div>
    </div>
  );
};
