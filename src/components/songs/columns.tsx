import { cn, formatDuration, timeSince } from "@/lib/utils";
import { Song } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Clock, Music2 } from "lucide-react";
import { Button } from "../ui/button";
import { useMusicPlayerStore } from "@/hooks/use-music-player-store";
import { RecentlyPlayedSong } from "@/hooks/use-recently-played";
import { useEffect, useState } from "react";

export const columns: ColumnDef<Song>[] = [
  {
    accessorKey: "id",
    header: "#",
    enableSorting: true,
    size: 20,
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
    cell: ({ row: { original: item } }) => <SongName song={item} />,
  },
  {
    accessorKey: "artist",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Artist
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
    cell: ({ row: { original: item } }) => (
      <span title={item.artist} className="line-clamp-1">
        {item.artist}
      </span>
    ),
  },
  {
    accessorKey: "album",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 "
        >
          Album
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
    cell: ({ row: { original: item } }) => (
      <span title={item.album} className="line-clamp-1">
        {item.album}
      </span>
    ),
  },
  {
    accessorKey: "duration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full justify-end px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Clock className="h-4 w-4" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 100,
    enableSorting: true,
    cell: ({ row: { original: item } }) => (
      <span className="line-clamp-1 text-end">
        {formatDuration(item.duration)}
      </span>
    ),
  },
];

export const recentlyPlayedSongColumns: ColumnDef<RecentlyPlayedSong>[] = [
  {
    id: "id",
    header: "#",
    enableSorting: true,
    size: 20,
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
    cell: ({ row: { original: item } }) => <SongName song={item} />,
  },
  {
    accessorKey: "artist",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Artist
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
    cell: ({ row: { original: item } }) => (
      <span title={item.artist} className="line-clamp-1">
        {item.artist}
      </span>
    ),
  },
  {
    accessorKey: "album",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 "
        >
          Album
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
    cell: ({ row: { original: item } }) => (
      <span title={item.album} className="line-clamp-1">
        {item.album}
      </span>
    ),
  },
  {
    accessorKey: "duration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Clock className="h-4 w-4" />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 100,
    enableSorting: true,
    cell: ({ row: { original: item } }) => (
      <span>{formatDuration(item.duration)}</span>
    ),
  },
  {
    accessorKey: "lastPlayed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full justify-end px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Played
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
    cell: ({ row: { original: item } }) => <LastPlayed song={item} />,
  },
];
const LastPlayed = ({
  song: { lastPlayed, id },
}: {
  song: RecentlyPlayedSong;
}) => {
  const [, setCurrentTime] = useState(new Date());
  const { songId } = useMusicPlayerStore();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup function to prevent memory leaks
  }, []);

  const formattedDate = songId === id ? "Now" : timeSince(lastPlayed);

  return <div className="w-full text-end">{formattedDate}</div>;
};

const SongName = ({ song }: { song: Song }) => {
  const { setPlaylistId, setSongId, songId } = useMusicPlayerStore();
  return (
    <div
      onClick={() => {
        setPlaylistId(0);
        setSongId(song.id);
      }}
      className={cn(
        "flex items-center gap-1 cursor-pointer",
        songId === song.id ? "text-black" : "hover:text-black"
      )}
    >
      {songId === song.id && <span className="text-black">▶️</span>}
      <Music2 className="h-4 w-4 text-muted-foreground" />
      <span title={song.title} className="line-clamp-1">
        {song.title}
      </span>
    </div>
  );
};
