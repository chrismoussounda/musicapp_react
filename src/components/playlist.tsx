import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useMusicPlayerStore } from "@/hooks/use-music-player-store";
import { usePlaylistQuery } from "@/api/hooks/usePlaylist";
import { useSearchStore } from "@/hooks/use-search-store";
import { formatDuration } from "@/lib/utils";

const Playlist = () => {
  const { playlistId, setCurrentSong, currentSong } = useMusicPlayerStore();
  const { data: playlist } = usePlaylistQuery(playlistId);
  const { filterSongs } = useSearchStore();

  if (!playlist) return null;

  const filteredSongs = filterSongs(playlist.songs || []);

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">
        {playlist?.title || "No playlist selected"}
      </h1>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                #
              </TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Title
              </TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Artist
              </TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Album
              </TableHead>
              <TableHead className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Duration
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&_tr:last-child]:border-0">
            {filteredSongs.map((song, index) => (
              <TableRow
                key={song.id}
                onClick={() => setCurrentSong(song)}
                className={cn(
                  "cursor-pointer",
                  currentSong?.id === song.id
                    ? "bg-accent"
                    : "hover:bg-accent/50"
                )}
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{song.title}</TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell>{song.album}</TableCell>
                <TableCell className="text-right">
                  {formatDuration(song.duration)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default Playlist;
