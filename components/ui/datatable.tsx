"use client";
import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Input } from "./input";
import { DataTablePagination } from "../shared/datatable/datatablepagination";
import { DataTableViewOptions } from "../shared/datatable/datatableviewoptions";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterBy: string;
  hideFilter?: boolean;
  hideViewOptions?: boolean;
  hidePagination?: boolean;
}

function DataTable<TData, TValue>({
  columns,
  data,
  filterBy,
  hideFilter = false,
  hideViewOptions = false,
  hidePagination = false,
}: DataTableProps<TData, TValue>) {
  // const [data, setData] = useState(users as unknown as BUser[]);
  //const [data, setData] = useState(users);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
      columnFilters,
    },
    // initialState: {
    //   pagination: {
    //     pageSize: 5,
    //   },
    // },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel:
      hidePagination == false ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  //console.log("BasicDataTable : data : ", data);
  //console.log("BasicDataTable : users : ", users);
  return (
    <>
      <div
        className={cn("flex items-center py-5 pb-10", {
          hidden: hideFilter == true && hideViewOptions == true,
        })}
      >
        {!hideFilter && (
          <Input
            placeholder={`search by ${filterBy} . . .`}
            value={
              (table.getColumn(filterBy)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filterBy)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}

        {!hideViewOptions && <DataTableViewOptions table={table} />}
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={columns.length}>
                <span className="">No records exists</span>
              </TableCell>
            </TableRow>
          )}
          {/* {} */}
        </TableBody>
      </Table>
      {/* <div className="flex gap-1">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => table.setPageIndex(0)}
        >
          <ChevronFirst />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          <ChevronRight />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          <ChevronLast />
        </Button>
      </div> */}

      {!hidePagination && (
        <div className="mt-3">
          <DataTablePagination table={table} />
        </div>
      )}
    </>
  );
}

export default DataTable;
