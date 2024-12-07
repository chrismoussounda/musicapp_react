import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
} from "./pagination";
import { Table } from "@tanstack/react-table";
import { useMemo } from "react";

interface TablePaginationProps<T> {
  table: Table<T>;
  sideBlocks?: number;
  className?: string;
}

const TablePagination = <T,>({
  table,
  sideBlocks = 1,
  className,
}: TablePaginationProps<T>) => {
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const getPaginationRange = useMemo((): (number | string)[] => {
    const range: (number | string)[] = [0];

    if (totalPages <= 1) {
      return range;
    }

    const rangeStart = Math.max(1, currentPage - sideBlocks);
    const rangeEnd = Math.min(totalPages - 2, currentPage + sideBlocks);

    if (rangeStart > 1) {
      range.push("...");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      range.push(i);
    }

    if (rangeEnd < totalPages - 2) {
      range.push("...");
    }

    range.push(totalPages - 1);
    return range;
  }, [totalPages, currentPage, sideBlocks]);

  return (
    <div
      className={cn(
        "relative flex justify-center items-center mt-auto",
        className
      )}
    >
      <Pagination className="mx-0 w-min">
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst
              href="#"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={table.previousPage}
              disabled={!table.getCanPreviousPage()}
            />
          </PaginationItem>
          {getPaginationRange.map((page, index) =>
            typeof page === "number" ? (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    table.setPageIndex(page);
                  }}
                  isActive={table.getState().pagination.pageIndex === page}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={table.nextPage}
              disabled={!table.getCanNextPage()}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast
              href="#"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePagination;
