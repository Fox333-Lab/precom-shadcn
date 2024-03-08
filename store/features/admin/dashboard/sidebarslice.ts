"use client";
import ICart, { ICartProduct } from "@/types/db/cart";
import { createSlice } from "@reduxjs/toolkit";

// export interface CartState {
//   cartItems: ICartProduct[];
// }
const initialState = {
  expandSidebar: true,
};
export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {
    toggleSideBar(state, action) {
      state.expandSidebar = !state.expandSidebar;
    },
  },
});

// selector to get all cart items
export const getSidebarState = (state: any) => state.sidebar.expandSidebar;

export const { toggleSideBar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
