import React from "react";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems, updateCart } from "@/store/features/cart/cartslice";
import Image from "next/image";
import ICart, { ICartProduct } from "@/types/db/cart";
import { TableCell, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { H3, H4 } from "../ui/textui";
import { Button } from "../ui/button";

const CartItem = ({
  cartItem,
  selected,
  setSelected,
}: {
  cartItem: ICartProduct;
  selected: ICartProduct[];
  setSelected: React.Dispatch<React.SetStateAction<ICartProduct[]>>;
}) => {
  const cartItems: ICartProduct[] = useSelector(getAllCartItems);
  const dispatch = useDispatch();
  console.log("CartItem selected : ", selected);
  // console.log("CartItem cartItem : ", cartItem);

  const updateQty = (type: string) => {
    let siqty = 0;
    console.log("_uid : ", cartItem._uid);
    console.log("_uid type : ", type);
    console.log("_uid cartItem.pqty : ", cartItem.pqty);
    siqty =
      type == "plus" ? Number(cartItem.pqty) + 1 : Number(cartItem.pqty) - 1;
    console.log("_uid siqty : ", siqty);
    let newCart = cartItems.map((p: ICartProduct) => {
      if (p._uid == cartItem._uid) {
        return {
          ...p,
          pqty: Number(siqty),
          // type == "plus"
          //   ? Number(cartItem.pqty) + 1
          //   : Number(cartItem.pqty) - 1,
        };
      }
      return p;
    });

    console.log("_uid newCart : ", newCart);

    let updatedSelected: ICartProduct[] = selected.map((sp: ICartProduct) => {
      if (sp._uid == cartItem._uid) {
        return {
          ...sp,
          pqty: Number(siqty),
        } as ICartProduct;
      }
      return sp as ICartProduct;
    });
    setSelected(updatedSelected);
    dispatch(updateCart(newCart));
  };

  const removeProduct = (puid: String) => {
    console.log("removeProduct puid : ", puid);
    let newCart = cartItems.filter((p: ICartProduct) => {
      return p._uid != puid;
    });
    dispatch(updateCart(newCart));
  };

  const handleCheck = (e: any, puid: String) => {
    console.log("checked : ", e);
    console.log("selected puid : ", puid);

    if (e) {
      //setSelected(selected.filter((p) => p._uid !== cartItem._uid));
      setSelected([...selected, cartItem as ICartProduct]);
    } else {
      setSelected(selected.filter((p: ICartProduct) => p._uid !== puid));
      //setSelected([...selected, cartItem]);
    }
  };

  return (
    <>
      <TableRow className="">
        <TableCell>
          <Checkbox
            onCheckedChange={(e) => handleCheck(e, cartItem._uid)}
            checked={
              selected.find((s: any) => s._uid == cartItem._uid) ? true : false
            }
            className=""
          />
        </TableCell>
        <TableCell>
          <div className="flex gap-4 items-center">
            <div className="h-20 w-20 bg-gray-50 rounded-md border border-gray-200 overflow-hidden">
              {/* <Image
                src={cartItem.images[0].url}
                alt={cartItem.name}
                width={80}
                height={80}
                sizes="80px"
                className="w-full object-cover aspect-square rounded-md"
              /> */}
              <img
                src={cartItem.images[0].url.toString()}
                alt={cartItem.name.toString()}
                className="w-full object-cover aspect-square rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <H4>
                {cartItem.name.length > 30
                  ? `${cartItem.name.toString().substring(0, 30)}`
                  : cartItem.name}
              </H4>
              <div className="flex flex-col gap-0">
                <div className="flex gap-1">
                  <span color="gray">Size</span>
                  <span className="font-medium">:</span>
                  <span className="font-medium">{cartItem.size}</span>
                </div>
                <div className="flex gap-1">
                  <span color="gray">Color</span>
                  <span className="font-medium">:</span>
                  <span className="font-medium">{cartItem.color.color}</span>
                </div>
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex gap-3 items-center">
            <Button
              variant="ghost"
              onClick={() => removeProduct(cartItem._uid)}
              size={"icon"}
            >
              <Trash2 size="16" />
            </Button>

            <Button
              onClick={() => updateQty("minus")}
              disabled={cartItem.pqty < 2}
              size={"icon"}
              className="rounded-full"
            >
              <Minus size="20" />
            </Button>
            <span>{cartItem.pqty}</span>
            <Button
              onClick={() => updateQty("plus")}
              disabled={cartItem.pqty == cartItem.quantity}
              size={"icon"}
              className="rounded-full"
            >
              <Plus size="20" />
            </Button>
          </div>
        </TableCell>
        <TableCell>
          {cartItem.price && (
            <span className="font-medium">
              ${(cartItem.price * cartItem.pqty).toFixed(2)}
            </span>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default CartItem;
