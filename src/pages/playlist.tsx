import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicPlayerStore } from "@/hooks/use-music-player-store";
import { usePlaylistQuery } from "@/api/hooks/usePlaylist";
import { useSearchStore } from "@/hooks/use-search-store";
import { formatDuration } from "@/lib/utils";
import { Clock, Music2 } from "lucide-react";
import { useParams } from "react-router-dom";

const Playlist = () => {
  const { id = "" } = useParams();
  const { setSongId, songId, setPlaylistId } = useMusicPlayerStore();
  const { data: playlist, isLoading, isError } = usePlaylistQuery(+id);
  const { filterSongs } = useSearchStore();

  const filteredSongs = filterSongs(playlist?.songs || []);
  console.log({ filteredSongs });

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">
        {isLoading ? "Loading..." : playlist?.title}
        {isError && "Playlist not found"}
      </h1>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Album</TableHead>
              <TableHead className="text-right">
                <Clock className="h-4 w-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song, index) => (
                <TableRow
                  key={song.id}
                  onClick={() => {
                    setPlaylistId(+id);
                    setSongId(song.id);
                  }}
                  className={cn(
                    "cursor-pointer",
                    songId === song.id ? "bg-accent" : "hover:bg-accent/50"
                  )}
                >
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="flex gap-3">
                    <Music2 className="h-4 w-4 text-muted-foreground" />
                    <span>{song.title}</span>
                  </TableCell>
                  <TableCell>{song.artist}</TableCell>
                  <TableCell>{song.album}</TableCell>
                  <TableCell className="text-right">
                    {formatDuration(song.duration)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default Playlist;
