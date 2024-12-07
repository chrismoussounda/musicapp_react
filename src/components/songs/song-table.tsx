import {
  getPaginationRowModel,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { Song } from "@/types";
import TablePagination from "../ui/table-pagination";
import { cn } from "@/lib/utils";
import { useMusicPlayerStore } from "@/hooks/use-music-player-store";

interface SongTableProps {
  songs: Song[];
  isLoading?: boolean;
}

const SongTable = ({ songs, isLoading }: SongTableProps) => {
  const { songId } = useMusicPlayerStore();
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: songs,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    maxLeafRowFilterDepth: 0,
    enableColumnResizing: false,
  });

  useEffect(() => {}, []);

  return (
    <div
      className={cn(
        "flex flex-col h-[calc(100vh-300px)]",
        songId && "h-[calc(100vh-350px)]"
      )}
    >
      <div
        className={cn(
          "overflow-y-auto max-h-[calc(100vh-340px)] min-h-56",
          songId && "max-h-[calc(100vh-390px)]"
        )}
      >
        <DataTable
          table={table}
          isLoading={isLoading}
          emptyMessage="No songs yet, Start adding some"
        />
      </div>
      <TablePagination table={table} />
    </div>
  );
};

export default SongTable;
