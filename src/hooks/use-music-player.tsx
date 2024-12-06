import { useState, useEffect, useCallback } from "react";
import { useMusicPlayerStore } from "./use-music-player-store";
import { usePlaylistQuery } from "@/api/hooks/usePlaylist";

export const useMusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    volume,
    playlistId,
    setCurrentSong,
    setIsPlaying,
    setCurrentTime,
    setVolume,
    resetPlayer,
  } = useMusicPlayerStore();
  const { data: playlist } = usePlaylistQuery(playlistId);

  const [playMode, setPlayMode] = useState<
    "normal" | "repeat" | "repeat-one" | "shuffle"
  >("normal");

  const [audioElement] = useState(new Audio());

  // Song Management
  const nextSong = useCallback(() => {
    if (!playlist || playlist.songs.length === 0) return;

    const currentIndex = playlist.songs.findIndex(
      (song) => song.id === currentSong?.id
    );
    let nextIndex;

    switch (playMode) {
      case "shuffle":
        nextIndex = Math.floor(Math.random() * playlist.songs.length);
        break;
      case "repeat-one":
        nextIndex = currentIndex;
        break;
      default:
        nextIndex = (currentIndex + 1) % playlist.songs.length;
    }

    setCurrentSong(playlist.songs[nextIndex]);
  }, [playlist, currentSong, playMode, setCurrentSong]);

  const prevSong = useCallback(() => {
    console.log({ playlist, currentSong });
    if (!playlist || playlist.songs.length === 0) return;

    const currentIndex = playlist.songs.findIndex(
      (song) => song.id === currentSong?.id
    );
    const prevIndex =
      currentIndex > 0
        ? (currentIndex - 1) % playlist.songs.length
        : playlist.songs.length - 1;
    setCurrentSong(playlist.songs[prevIndex]);
  }, [playlist, currentSong, setCurrentSong]);

  // Set initial song when playlist changes
  useEffect(() => {
    if (playlist && playlist.songs.length > 0 && !currentSong) {
      setCurrentSong(playlist.songs[0]);
    }
  }, [playlist, currentSong, setCurrentSong]);

  // Audio Playback Effects
  useEffect(() => {
    if (currentSong && currentSong.url) {
      audioElement.src = currentSong.url || "";
      audioElement.load();

      if (isPlaying) {
        audioElement.play().catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSong, isPlaying, audioElement, setIsPlaying]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying && currentSong) {
      intervalId = setInterval(() => {
        const newTime = Math.min(currentTime + 1, currentSong.duration || 0);
        setCurrentTime(newTime);

        // Auto-stop when song ends
        if (newTime >= (currentSong.duration || 0)) {
          setIsPlaying(false);
        }
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, currentSong, currentTime, setCurrentTime, setIsPlaying]);

  // End of Song Handling
  useEffect(() => {
    const handleEndedSong = () => {
      switch (playMode) {
        case "repeat-one":
          audioElement.currentTime = 0;
          audioElement.play();
          break;
        case "normal":
        case "repeat":
        case "shuffle":
          nextSong();
          break;
      }
    };

    audioElement.addEventListener("ended", handleEndedSong);
    return () => {
      audioElement.removeEventListener("ended", handleEndedSong);
    };
  }, [audioElement, playMode, nextSong]);

  // Existing playback controls
  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const playPause = () => {
    console.log({ isPlaying });
    if (!currentSong) return;
    if (currentTime === currentSong.duration && !isPlaying) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const seekTo = (time: number) => {
    setCurrentTime(time);
    audioElement.currentTime = time;
  };

  // Playlist and Play Mode Controls
  const togglePlayMode = () => {
    const modes: Array<"normal" | "repeat" | "repeat-one" | "shuffle"> = [
      "normal",
      "repeat",
      "repeat-one",
      "shuffle",
    ];
    const currentModeIndex = modes.indexOf(playMode);
    const nextModeIndex = (currentModeIndex + 1) % modes.length;
    setPlayMode(modes[nextModeIndex]);
  };

  return {
    // Playback state
    currentSong,
    isPlaying,
    currentTime,
    volume,

    // Playback controls
    play,
    pause,
    playPause,
    seekTo,

    // Playlist controls
    nextSong,
    prevSong,

    // Play mode
    playMode,
    togglePlayMode,

    // Other store methods
    setCurrentSong,
    setVolume,
    resetPlayer,
  };
};
