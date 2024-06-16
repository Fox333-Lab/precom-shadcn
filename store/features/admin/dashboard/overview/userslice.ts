"use client";
import IUser from "@/types/db/user";
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
export interface UsersState {
  allUsers: IUser[];
}
const initialState: UsersState = {
  allUsers: [],
};
export const overviewUserSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addAllUserToState(state, action) {
      state.allUsers = action.payload;
    },
    addUserState(state, action) {
      state.allUsers.push(action.payload);
    },
    updateUserState(state, action) {
      state.allUsers = action.payload;
    },
    emptyUserState(state, action) {
      state.allUsers = [];
    },
  },
});

// selector to get all users
export const getAllUsers = (state: any) => state.users.allUsers;

export const {
  addUserState,
  updateUserState,
  emptyUserState,
  addAllUserToState,
} = overviewUserSlice.actions;

export default overviewUserSlice.reducer;
