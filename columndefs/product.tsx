import { DataTableColumnHeader } from "@/components/shared/datatable/datatablecolumnheader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DATE_FORMAT_DDMMYYYY } from "@/lib/constants/date";
import { TAdminAllProduct, TProduct } from "@/types/db/product";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Check,
  CheckCircle2,
  Circle,
  Edit,
  Eye,
  MinusCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import ICategory from "@/types/db/category";

const productColumnHelper = createColumnHelper<TAdminAllProduct>();

export const productColumnDefs = [
  productColumnHelper.accessor("name", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Product" />;
    },
    cell: ({ row }) => {
      const product = row.original;
      //   console.log("actions product : ", product);
      //   console.log(
      //     "actions product?.subProducts?.values : ",
      //     product?.subProducts[0]?.color.color.toString()
      //   );
      return (
        <Link href="" className="flex gap-2 items-center">
          <Avatar className={cn("rounded-sm")}>
            <AvatarImage src={product?.image.toString()} />
            <AvatarFallback>
              {product.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{product.name}</span>
        </Link>
      );
    },
  }),
  productColumnHelper.accessor("sku", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="SKU" />;
    },
  }),
  productColumnHelper.accessor("brand", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Brand" />;
    },
  }),
  //   productColumnHelper.accessor("image", {
  //     header: ({ column }) => {
  //       return <DataTableColumnHeader column={column} title="Image" />;
  //     },
  //     cell: (cell) => {
  //       if (cell.getValue() === "" || cell.getValue() === null) {
  //         return cell.getValue();
  //       }
  //       return (
  //         <Avatar>
  //           <AvatarImage src={cell.getValue().toString()} />
  //           <AvatarFallback>CN</AvatarFallback>
  //         </Avatar>
  //       );
  //     },
  //   }),
  productColumnHelper.accessor("category", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Category" />;
    },
  }),
  productColumnHelper.accessor("inStock", {
    // header: ({ column }) => {
    //   return <DataTableColumnHeader column={column} title="In Stock" />;
    // },
    header: "In Stock",
    cell: ({ row }) => {
      const sizes = row.original.size;
      return (
        <div className="flex flex-col w-full gap-1">
          {/* <div className=""> */}
          {sizes.map((size, i) => {
            return (
              <div className="flex items-center" key={i}>
                <div className="flex-1">{size.size}</div>
                <div className="flex-1">
                  {Number(size.qty) > 0 ? (
                    <Circle
                      color="#22c55e"
                      fill="#22c55e"
                      className="bg-green-400"
                      size={12}
                    />
                  ) : (
                    <Circle
                      color="red"
                      fill="red"
                      className="bg-red-500"
                      size={12}
                    />
                  )}
                </div>
              </div>
            );
          })}
          {/* </div> */}
        </div>
      );
    },
  }),
  productColumnHelper.accessor("updatedAt", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Last Updated" />;
    },
    cell: (cell) => {
      return format(cell.getValue(), DATE_FORMAT_DDMMYYYY);
    },
  }),
  productColumnHelper.accessor("createdAt", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Added On" />;
    },
    cell: (cell) => {
      return format(cell.getValue(), DATE_FORMAT_DDMMYYYY);
    },
  }),
  //   productColumnHelper.accessor("active", {
  //     header: "active",
  //     cell: (cell) => {
  //       if (cell.getValue() == true) {
  //         return <CheckCircle2 color="#33cc33" />;
  //       } else {
  //         return <MinusCircle color="red" />;
  //       }
  //     },
  //   }),
  productColumnHelper.accessor("actions", {
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      //   console.log("actions user : ", product);
      return (
        // <Button variant={"ghost"} asChild>
        <div className="h-10 py-2">
          <Link
            href={`/admin/dashboard/users/details/${product._id.toString()}`}
          >
            <Edit size={18} />
          </Link>
        </div>
        // </Button>
      );
    },
  }),
] as ColumnDef<TAdminAllProduct>[];
