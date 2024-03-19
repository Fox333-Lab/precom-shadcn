"use client";
import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import IUser from "@/types/db/user";
import { Button } from "./button";
import {
  ArrowUpDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
} from "lucide-react";
import { Input } from "./input";
import { format } from "date-fns";
import { DATE_FORMAT_DDMMYYYY } from "@/lib/constants/date";

// type User = {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
//   role: string;
//   image: string;
//   emailVerified: boolean;
//   defaultPaymentMethod: string;
//   createdAt: string;
//   updatedAt: string;
// };

type BUser = IUser & {
  createdAt: string;
};

const columnHelper = createColumnHelper<BUser>();

const columns = [
  columnHelper.accessor("name", {
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown size={16} className="ml-2" />
        </Button>
      );
    },
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("image", {
    header: "Image",
  }),
  columnHelper.accessor("emailVerified", {
    header: "Verified",
  }),
  columnHelper.accessor("defaultPaymentMethod", {
    header: "Payment Method",
  }),
  columnHelper.accessor("createdAt", {
    header: "Joined On",
    cell: (cell) => {
      return new Date(cell.getValue()).toLocaleDateString();
    },
  }),
];

const BasicDataTable = ({ users }: { users: IUser[] }) => {
  const [data, setData] = useState(users as unknown as BUser[]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // initialState: {
    //   sorting: [
    //     {
    //       id: "name",
    //       desc: true,
    //     },
    //   ],
    // },
  });
  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex gap-1">
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
      </div>
    </>
  );
};

export default BasicDataTable;
