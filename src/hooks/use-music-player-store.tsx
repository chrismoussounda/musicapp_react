import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Song } from "@/lib/interfaces";

type PlayMode = "normal" | "repeat" | "repeat-one" | "shuffle";

interface MusicPlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  playlistId: number;
  playMode: PlayMode;

  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  setPlaylistId: (playlistId: number) => void;
  setPlayMode: (mode: PlayMode) => void;
  resetPlayer: () => void;
}

export const useMusicPlayerStore = create<MusicPlayerState>()(
  persist(
    (set) => ({
      currentSong: null,
      isPlaying: false,
      currentTime: 0,
      volume: 1,
      playlistId: 0,
      playMode: "normal",

      setCurrentSong: (song) => set({ currentSong: song, currentTime: 0 }),

      setIsPlaying: (isPlaying) => set({ isPlaying }),

      setCurrentTime: (time) => set({ currentTime: time }),

      setVolume: (volume) => set({ volume }),

      setPlaylistId: (playlistId) =>
        set({
          playlistId,
          currentSong: null,
        }),

      setPlayMode: (playMode) => set({ playMode }),

      resetPlayer: () =>
        set({
          currentSong: null,
          isPlaying: false,
          currentTime: 0,
          playlistId: 0,
          playMode: "normal",
        }),
    }),
    {
      name: "music-player-storage",
      partialize: (state) => ({
        currentSong: state.currentSong,
        volume: state.volume,
        playlistId: state.playlistId,
        playMode: state.playMode,
      }),
    }
  )
);
