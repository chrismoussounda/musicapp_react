import {
  getPaginationRowModel,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import { useState } from "react";
import { RecentlyPlayedSong } from "@/hooks/use-recently-played";
import { recentlyPlayedSongColumns } from "./columns";

interface RecentSongTableProps {
  songs: RecentlyPlayedSong[];
  isLoading?: boolean;
}

const RecentSongTable = ({ songs, isLoading }: RecentSongTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: songs,
    columns: recentlyPlayedSongColumns,
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

  return (
    <DataTable
      table={table}
      isLoading={isLoading}
      emptyMessage="No recently played songs yet, Start listening!"
    />
  );
};

export default RecentSongTable;
