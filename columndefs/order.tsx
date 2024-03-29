import { DataTableColumnHeader } from "@/components/shared/datatable/datatablecolumnheader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DATE_FORMAT_DDMMYYYY } from "@/lib/constants/date";
import { TOrder } from "@/types/db/order";
import IUser from "@/types/db/user";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import Link from "next/link";

const orderColumnHelper = createColumnHelper<TOrder>();
export const OrderColumnDefs = [
  orderColumnHelper.accessor("_id", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ID" />;
    },
  }),
  orderColumnHelper.accessor("user", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="By" />;
    },
    cell: ({ row }) => {
      const user = row.original.user as unknown as IUser;
      return user.name;
    },
  }),
  orderColumnHelper.accessor("isPaid", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Paid" />;
    },
    cell: (cell) => {
      if (cell.getValue() == true) {
        return <span className="text-green-500 font-medium">Yes</span>;
      } else {
        return <span className="text-red-500 font-medium">No</span>;
      }
    },
  }),
  orderColumnHelper.accessor("status", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Order Status" />;
    },
  }),
  //   columnHelper.accessor("emailVerified", {
  //     header: ({ column }) => {
  //       return <DataTableColumnHeader column={column} title="Verified" />;
  //     },
  //     cell: (cell) => {
  //       if (cell.getValue() == true) {
  //         return <Check color="#33cc33" />;
  //       } else {
  //         return <X color="red" />;
  //       }
  //     },
  //   }),
  orderColumnHelper.accessor("paymentMethod", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Payment Method" />;
    },
  }),
  orderColumnHelper.accessor("createdAt", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Ordered On" />;
    },
    cell: (cell) => {
      return format(cell.getValue(), DATE_FORMAT_DDMMYYYY);
    },
  }),
  orderColumnHelper.accessor("total", {
    header: "Total",
  }),
  orderColumnHelper.accessor("actions", {
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;
      // console.log("actions order : ", order);
      return (
        // <Button variant={"ghost"} asChild>
        <div className="h-10 py-2">
          <Link href={`/admin/dashboard/order/details/${order._id.toString()}`}>
            <Eye size={18} />
          </Link>
        </div>
        // </Button>
      );
    },
  }),
] as ColumnDef<TOrder>[];

export const RecentOrderColumnDefs = [
  orderColumnHelper.accessor("_id", {
    header: "ID",
  }),
  orderColumnHelper.accessor("isPaid", {
    header: "Paid",
    cell: (cell) => {
      if (cell.getValue() == true) {
        return <span className="text-green-500 font-medium">Yes</span>;
      } else {
        return <span className="text-red-500 font-medium">No</span>;
      }
    },
  }),
  orderColumnHelper.accessor("status", {
    header: "Order Status",
  }),
  orderColumnHelper.accessor("createdAt", {
    header: "Ordered On",
    cell: (cell) => {
      return format(cell.getValue(), DATE_FORMAT_DDMMYYYY);
    },
  }),
  orderColumnHelper.accessor("total", {
    header: "Total",
  }),
  orderColumnHelper.accessor("actions", {
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;
      // console.log("actions order : ", order);
      return (
        // <Button variant={"ghost"} asChild>
        <div className="h-10 py-2">
          <Link href={`/admin/dashboard/order/details/${order._id.toString()}`}>
            <Eye size={18} />
          </Link>
        </div>
        // </Button>
      );
    },
  }),
] as ColumnDef<TOrder>[];

export const RecentOrderColumnSkeletonDefs = [
  orderColumnHelper.accessor("_id", {
    header: "ID",
    cell: () => <Skeleton className="w-25 h-4" />,
  }),
  orderColumnHelper.accessor("isPaid", {
    header: "Paid",
    cell: (cell) => <Skeleton className="w-12 h-4" />,
  }),
  orderColumnHelper.accessor("status", {
    header: "Order Status",
    cell: () => <Skeleton className="w-20 h-4" />,
  }),
  orderColumnHelper.accessor("createdAt", {
    header: "Ordered On",
    cell: (cell) => <Skeleton className="w-15 h-4" />,
  }),
  orderColumnHelper.accessor("total", {
    header: "Total",
    cell: () => <Skeleton className="w-12 h-4" />,
  }),
  orderColumnHelper.accessor("actions", {
    header: "Actions",
    cell: () => (
      <div className="h-10 py-2">
        <Skeleton className="w-6 h-4" />
      </div>
    ),
  }),
] as ColumnDef<TOrder>[];
