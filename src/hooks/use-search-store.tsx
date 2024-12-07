import { create } from "zustand";
import { Song } from "@/types";

interface SearchStore {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterSongs: (songs: Song[]) => Song[];
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  searchTerm: "",

  setSearchTerm: (term) => set({ searchTerm: term }),

  filterSongs: (songs) => {
    const { searchTerm } = get();

    if (!searchTerm) return songs;

    const lowercaseTerm = searchTerm.toLowerCase();

    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(lowercaseTerm) ||
        song.artist.toLowerCase().includes(lowercaseTerm) ||
        song.album.toLowerCase().includes(lowercaseTerm)
    );
  },
}));
