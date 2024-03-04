import { ICartProduct } from "@/types/db/cart";
import axios from "axios";
import { useSWRFetch } from "../hooks/usefetch";

export const saveCartToDB = async (cart: ICartProduct[]) => {
  console.log("In functions/saveCartToDB");
  console.log("In functions/saveCartToDB : ", cart);
  try {
    const { data } = await axios.post("/api/user/cart/savetodb", {
      cart,
    });
    return data;
  } catch (err: any) {
    console.log("saveCartToDB : ", err.message);
    return null;
  }
};

export const getCartByUserId = async (userId: string) => {
  console.log("Inside functions/getCartByUserId : userId : ", userId);
  try {
    const { data, error, isLoading } = await useSWRFetch(
      `/api/user/cart/${userId}`
    );
    if (data) return data;
  } catch (err: any) {
    console.log("getCartByUserId : ", err.message);
    return null;
  }
};
