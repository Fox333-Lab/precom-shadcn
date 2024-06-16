import { UserDetails } from "@/components/admin/dashboard/users";
import { DataTableColumnHeader } from "@/components/shared/datatable/datatablecolumnheader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { DATE_FORMAT_DDMMYYYY } from "@/lib/constants/date";
import { TUser } from "@/types/db/user";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Check,
  CheckCircle2,
  Eye,
  MinusCircle,
  MoreVertical,
  X,
} from "lucide-react";
import Link from "next/link";

const userColumnHelper = createColumnHelper<TUser>();

export const RecentUserColumnDefs = [
  userColumnHelper.accessor("actions", {
    header: "Customer",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Link
          href={`/admin/dashboard/users/details/${user._id.toString()}`}
          className="flex gap-2 items-center"
        >
          <Avatar>
            <AvatarImage src={user.image.toString()} />
            <AvatarFallback>
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <span>{user.name}</span>
        </Link>
      );
    },
  }),
  userColumnHelper.accessor("createdAt", {
    header: "Joined On",
    cell: (cell) => {
      return format(cell.getValue(), DATE_FORMAT_DDMMYYYY);
    },
  }),
] as ColumnDef<TUser>[];

export const userColumnDefs = [
  userColumnHelper.accessor("name", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  }),
  userColumnHelper.accessor("email", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  }),
  userColumnHelper.accessor("image", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Image" />;
    },
    cell: (cell) => {
      if (cell.getValue() === "" || cell.getValue() === null) {
        return cell.getValue();
      }
      return (
        <Avatar>
          <AvatarImage src={cell.getValue().toString()} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      );
    },
  }),
  userColumnHelper.accessor("emailVerified", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Verified" />;
    },
    cell: (cell) => {
      if (cell.getValue() == true) {
        return <Check color="#33cc33" />;
      } else {
        return <X color="red" />;
      }
    },
  }),
  userColumnHelper.accessor("defaultPaymentMethod", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Payment Method" />;
    },
  }),
  userColumnHelper.accessor("createdAt", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Joined On" />;
    },
    cell: (cell) => {
      return format(cell.getValue(), DATE_FORMAT_DDMMYYYY);
    },
  }),
  userColumnHelper.accessor("active", {
    header: "active",
    cell: (cell) => {
      if (cell.getValue() == true) {
        return <CheckCircle2 color="#33cc33" />;
      } else {
        return <MinusCircle color="red" />;
      }
    },
  }),
  userColumnHelper.accessor("actions", {
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        // <Dialog>
        //   <DropdownMenu>
        //     <DropdownMenuTrigger asChild>
        //       <Button variant="ghost" className="h-8 w-8 p-0">
        //         <span className="sr-only">Open menu</span>
        //         <MoreVertical className="h-4 w-4" />
        //       </Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent align="end">

        //       <DialogTrigger asChild>
        //         <DropdownMenuItem>Open </DropdownMenuItem>
        //       </DialogTrigger>
        //     </DropdownMenuContent>
        //   </DropdownMenu>
        //   <DialogContent>
        //     <DialogHeader>
        //       <DialogTitle>
        //         {user.name} ( {user.address.length.toString()} )
        //       </DialogTitle>

        //     </DialogHeader>
        //     <UserDetails addresses={user.address} />
        //   </DialogContent>

        // </Dialog>
        <Button variant={"ghost"} asChild>
          <Link href={`/admin/dashboard/users/details/${user._id.toString()}`}>
            <Eye size={18} />
          </Link>
        </Button>
      );
    },
  }),
] as ColumnDef<TUser>[];

export const RecentUserColumnSkeletonDefs = [
  userColumnHelper.accessor("actions", {
    header: "Customer",
    cell: () => {
      return (
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>
              <Skeleton className="w-full h-full" />
            </AvatarFallback>
          </Avatar>
          <span>
            <Skeleton className="w-20 h-4" />
          </span>
        </div>
      );
    },
  }),
  userColumnHelper.accessor("createdAt", {
    header: "Joined On",
    cell: (cell) => <Skeleton className="w-25 h-4" />,
  }),
] as ColumnDef<TUser>[];
