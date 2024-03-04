"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCart } from "@/store/features/cart/cartslice";
import { CartHeader, CartItem, CartSummary } from ".";
import { compareArrays } from "@/lib/utils";
import ICart, { ICartProduct } from "@/types/db/cart";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { saveCartToDB } from "@/lib/functions/cart";

const ItemsCart = ({ cartItems }: { cartItems: ICartProduct[] }) => {
  const [selected, setSelected] = useState<ICartProduct[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [active, setActive] = useState(false);
  const [initialCheck, setInitialCheck] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  // const [total, setTotal] = useState(0);
  console.log("itemscart session : ", session);
  // console.log("itemscart status : ", status);
  useEffect(() => {
    console.log("in useeefect22 : cartItems.length : ", cartItems.length);
    console.log("in useeefect : cartItems:ICart : ", cartItems);

    const refreshCartOnLoad = async () => {
      const { data } = await axios.post("/api/user/cart/refresh", {
        products: cartItems,
      });
      console.log("refreshCartOnLoad : ", data);
      dispatch(updateCart(data));
    };
    if (cartItems.length > 0) {
      console.log("in itemscart : cartItems.length : ", cartItems.length);
      refreshCartOnLoad();
    }
  }, []);
  useEffect(() => {
    console.log("ItemsCart : selected : ", selected);
    if (selected.length > 0) {
      setShippingFee(selected.reduce((a, c: any) => a + Number(c.shipping), 0));
      setSubTotal(
        selected.reduce((a, c: any) => a + Number(c.price) * Number(c.pqty), 0)
      );
      // let ttotal = selected.reduce((a, c) => a + c.price * c.pqty, 0);
      // ttotal = ttotal + shippingFee;
      // setTotal(ttotal);
    } else {
      setShippingFee(0);
      setSubTotal(0);
      // setTotal(0);
    }
    console.log("initialCheck : ", initialCheck);
    const check =
      initialCheck == false ? compareArrays(cartItems, selected) : false;
    console.log("check : ", check);
    console.log("initialCheck : ", initialCheck);
    setActive(check);
    setInitialCheck(false);
  }, [selected]);

  const saveCartToDBHandler = async () => {
    if (session) {
      console.log("itemscart : saveCartToDBHandler : ", session);
      const res = await saveCartToDB(selected);
      if (res != null) {
        console.log("items cart : saveCartToDBHandler : res :", res);
      }
      router.push("/checkout");
    } else {
      signIn();
    }
  };

  const handleCheckAll = () => {
    console.log("cartItems.length : ", cartItems.length);
    console.log("selected.length : ", selected.length);
    if (cartItems.length !== selected.length) {
      //let newSelected = cartItems as never[];
      //console.log("new selected : ", newSelected);
      //setSelected(newSelected);
      setSelected(cartItems);
      console.log("selected : ", selected);
    } else {
      setSelected([]);
    }
  };
  return (
    <>
      <section>
        <div className="flex flex-col gap-10">
          <CartHeader cartItems={cartItems} />
          <div className="flex flex-col justify-between gap-12 md:flex-row">
            <div style={{ flexGrow: 8 }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-5">
                      <Checkbox
                        checked={active}
                        onCheckedChange={() => handleCheckAll()}
                      />
                    </TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total Price</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {cartItems.map((cartItem: ICartProduct) => (
                    <CartItem
                      cartItem={cartItem}
                      key={cartItem._uid}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  ))}
                </TableBody>
              </Table>
              {/* <ItemsTable cartItems={cartItems} /> */}
            </div>
            <div style={{ flexGrow: 2 }}>
              <CartSummary
                subTotal={subTotal.toFixed(2)}
                shippingFee={shippingFee}
                // total={total}
                selected={selected}
                saveCartToDBHandler={saveCartToDBHandler}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ItemsCart;
