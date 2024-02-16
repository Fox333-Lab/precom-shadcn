"use client";
import ICart, { ICartProduct } from "@/types/db/cart";
import { createSlice } from "@reduxjs/toolkit";

// type InitialState = {
//   cartItems: cartState;
// };
// type cartState = ICart;
//const varCart = {} as cartState;
// const cartProduct: ICartProduct = {
//   product: ObjectId(""),
//   name: "",
//   image: "",
//   size: "",
//   style: 0,
//   pqty: 0,
//   color: {
//     color: "",
//     image: "",
//   },
//   price: 0,
// };
// const cartItems: ICart = {
//   products: [],
// };
//const initialState: Array<ICart> = [cartItems];
// const initialState = {
//   cartItems: [{} as ICart],
// };
export interface CartState {
  cartItems: ICartProduct[];
}
const initialState: CartState = {
  cartItems: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    updateCart(state, action) {
      state.cartItems = action.payload;
    },
    emptyCart(state, action) {
      state.cartItems = [];
    },
  },
});

// selector to get all cart items
export const getAllCartItems = (state: any) => state.cart.cartItems;

export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
