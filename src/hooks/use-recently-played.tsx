import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Song } from "@/types";

export interface RecentlyPlayedSong extends Song {
  lastPlayed: Date;
}

interface RecentlyPlayedState {
  lastPlayedSongId: number;
  recentlyPlayed: RecentlyPlayedSong[];
  addOrUpdateSong: (song: Omit<RecentlyPlayedSong, "lastPlayed">) => void;
}

export const useRecentlyPlayed = create<RecentlyPlayedState>()(
  persist(
    (set) => ({
      lastPlayedSongId: 0,
      recentlyPlayed: [],
      addOrUpdateSong: (song) =>
        set((state) => {
          const existingSongIndex = state.recentlyPlayed.findIndex(
            (s) => s.id === song.id
          );
          if (existingSongIndex !== -1) {
            const updatedSongs = [...state.recentlyPlayed];
            updatedSongs[existingSongIndex] = {
              ...updatedSongs[existingSongIndex],
              lastPlayed: new Date(),
            };
            return {
              recentlyPlayed: updatedSongs,
              lastPlayedSongId: song.id,
            };
          } else {
            if (state.recentlyPlayed.length >= 10) {
              state.recentlyPlayed.shift();
            }

            return {
              lastPlayedSongId: song.id,
              recentlyPlayed: [
                {
                  ...song,
                  lastPlayed: new Date(),
                },
                ...state.recentlyPlayed,
              ],
            };
          }
        }),
    }),
    {
      name: "recently-played-storage",
    }
  )
);
