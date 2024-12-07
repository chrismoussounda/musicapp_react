import { create } from "zustand";
import { persist } from "zustand/middleware";

type PlayMode = "normal" | "repeat" | "repeat-one" | "shuffle";

interface MusicPlayerState {
  songId: number;
  isPlaying: boolean;
  volume: number;
  playlistId: number;
  playMode: PlayMode;

  setSongId: (songId: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setPlaylistId: (playlistId: number) => void;
  setPlayMode: (mode: PlayMode) => void;
  resetPlayer: () => void;
}

export const useMusicPlayerStore = create<MusicPlayerState>()(
  persist(
    (set) => ({
      songId: 0,
      isPlaying: false,
      currentTime: 0,
      volume: 50,
      playlistId: 0,
      playMode: "normal",

      setSongId: (songId) => set({ songId, isPlaying: true }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setVolume: (volume) => set({ volume }),
      setPlaylistId: (playlistId) =>
        set({
          playlistId,
          songId: 0,
          isPlaying: false,
        }),
      setPlayMode: (playMode) => set({ playMode }),
      resetPlayer: () =>
        set({
          songId: 0,
          isPlaying: false,
          playlistId: 0,
          playMode: "normal",
        }),
    }),
    {
      name: "music-player-storage",
      partialize: (state) => ({
        songId: state.songId,
        volume: state.volume,
        playlistId: state.playlistId,
        playMode: state.playMode,
      }),
    }
  )
);
