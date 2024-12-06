import React, { useEffect } from "react";
import { NowPlayingProps } from "@/lib/interfaces";
import { useMusicPlayerStore } from "@/hooks/use-music-player-store";

// coverUrl = "https://via.placeholder.com/150",
const NowPlaying: React.FC<NowPlayingProps> = () => {
  const { currentSong, playlistId, setCurrentSong } = useMusicPlayerStore();

  console.log({ currentSong, playlistId });

  useEffect(() => {
    if (!playlistId && currentSong) setCurrentSong(null);
  }, [currentSong, playlistId, setCurrentSong]);

  return (
    <div className="flex items-center space-x-4 h-14">
      <div className="h-12 w-12 rounded-md bg-gray-200">
        {currentSong?.coverUrl && (
          <img
            src={currentSong.coverUrl}
            alt={`${currentSong.title} album cover`}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium">
          {currentSong?.title || "No song playing"}
        </h3>
        {currentSong && (
          <p className="text-xs text-gray-500">{currentSong.artist}</p>
        )}
      </div>
    </div>
  );
};

export default NowPlaying;
