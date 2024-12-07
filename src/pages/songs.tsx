import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSongsQuery } from "@/api/hooks/useSong";
import SongTable from "@/components/songs/song-table";
import { AddSongModal } from "@/components/modal/add-song-modal";

const Songs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: songs = [], isLoading } = useSongsQuery();

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Songs</h1>
        <AddSongModal />
      </div>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search songs or artists"
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <SongTable songs={filteredSongs} isLoading={isLoading} />
    </div>
  );
};

export default Songs;
