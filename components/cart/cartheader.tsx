"use client";
import { compareArrays } from "@/lib/utils";
import { ICartProduct } from "@/types/db/cart";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { H2, H4 } from "../ui/textui";

const CartHeader = ({
  cartItems,
}: //   selected,
//   setSelected,
{
  cartItems: ICartProduct[];
  //   selected: never[];
  //   setSelected: React.Dispatch<React.SetStateAction<never[]>>;
}) => {
  //   const [active, setActive] = useState(false);

  //   useEffect(() => {
  //     const check = compareArrays(cartItems, selected);
  //     console.log("check : ", check);
  //     setActive(check);
  //   }, [selected]);

  //   const handleCheck = () => {
  //     console.log("cartItems.length : ", cartItems.length);
  //     console.log("selected.length : ", selected.length);
  //     if (cartItems.length !== selected.length) {
  //       //let newSelected = cartItems as never[];
  //       //console.log("new selected : ", newSelected);
  //       //setSelected(newSelected);
  //       setSelected(cartItems);
  //       console.log("selected : ", selected);
  //     } else {
  //       setSelected([]);
  //     }
  //   };
  return (
    <>
      <div className="flex justify-between flex-wrap">
        {/* <Link href=""> */}
        {/* <HiShoppingBag /> */}
        <H4>Items Summary ({cartItems.length})</H4>
        {/* </Link> */}
        <div className="flex justify-center items-center gap-2">
          <Link href="">Continue Shopping</Link>
          <MoveRight size="16" />
        </div>
      </div>
      {/* <Flex className="form-control mt-2">
        <label className="cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox"
            checked={active}
            onChange={() => handleCheck()}
          />
          <span className="label-text">Select All</span>
        </label>
      </Flex> */}
    </>
  );
};

export default CartHeader;
