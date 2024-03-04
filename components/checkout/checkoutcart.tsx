import ICart, { ICartProduct } from "@/types/db/cart";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { H4 } from "../ui/textui";

type CheckoutCartPropsTypes = {
  cart: ICart;
};

const CheckoutCart = ({ cart }: CheckoutCartPropsTypes) => {
  // console.log("cart :>> ", cart);
  console.log("In CheckoutCart");
  const cartDetails = cart.products as unknown as ICartProduct[];
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cartDetails &&
            cartDetails.map((product: any) => {
              return (
                <TableRow key={product._id}>
                  <TableCell>
                    <div className="flex gap-4 items-center">
                      <div className="h-20 w-20 bg-gray-50 rounded-md border border-gray-200 overflow-hidden">
                        <img
                          src={product.image.toString()}
                          alt={product.name.toString()}
                          className="w-full object-cover aspect-square rounded-md"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <H4>
                          {product.name.length > 30
                            ? `${product.name.toString().substring(0, 30)}`
                            : product.name}
                        </H4>
                        <div className="flex flex-col gap-0">
                          <div className="flex gap-1">
                            <span color="gray">Size</span>
                            <span className="font-medium">:</span>
                            <span className="font-medium">{product.size}</span>
                          </div>
                          <div className="flex gap-1">
                            <span color="gray">Color</span>
                            <span className="font-medium">:</span>
                            <span className="font-medium">
                              {product.color.color}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.pqty}</TableCell>
                  <TableCell>{product.price * product.pqty}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell>
              {cartDetails.reduce(
                (acc: number, item: ICartProduct) =>
                  acc + item.price * item.pqty,
                0
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CheckoutCart;
