"use client";
import { getAllCartItems } from "@/store/features/cart/cartslice";
import { useSelector } from "react-redux";
import { EmptyCart, ItemsCart } from ".";
import ICart, { ICartProduct } from "@/types/db/cart";
const Cart = () => {
  //const { cart } = useSelector((state) => ({ ...state }));
  const cartItems: ICartProduct[] = useSelector(getAllCartItems);
  console.log("Cart.jsx 1 : cartItems length : ", cartItems.length);
  return (
    <div>
      <div className="">
        {cartItems.length > 0 ? (
          <ItemsCart cartItems={cartItems} />
        ) : (
          // <div>Cart Items</div>
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default Cart;
