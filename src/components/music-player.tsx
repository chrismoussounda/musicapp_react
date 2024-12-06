import React from "react";
import NowPlaying from "./now-playing";
import PlaybackControls from "./playback-controls";
import VolumeControl from "./volume-control";
import Playlist from "./playlist";
import Header from "./header";
import Sidebar from "./sidebar";
import { cn } from "@/lib/utils";
import { useMusicPlayerStore } from "@/hooks/use-music-player-store";

const MusicPlayer: React.FC = () => {
  const { playlistId } = useMusicPlayerStore();
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Playlist />
      </div>
      <div
        className={cn(
          "relative flex items-center justify-between border-t px-6 py-4",
          !playlistId && "pointer-events-none "
        )}
      >
        <NowPlaying />
        <PlaybackControls />
        <VolumeControl />
      </div>
    </div>
  );
};

export default MusicPlayer;
