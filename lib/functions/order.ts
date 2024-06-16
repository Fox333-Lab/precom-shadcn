import ICart, { ICartProduct } from "@/types/db/cart";
import { IAddress } from "@/types/db/user";
import axios from "axios";
import { useSWRFetch } from "../hooks/usefetch";

export const createOrder = async (
  cart: ICart,
  selectedAddress: IAddress,
  paymentMethod: string,
  totalAfterDiscount: string,
  couponApplied: string
) => {
  console.log("Inside functions/order/createOrder");
  try {
    const { data } = await axios.post("/api/user/order/create", {
      products: cart.products as unknown as ICartProduct[],
      shippingAddress: selectedAddress,
      paymentMethod,
      total: Number(
        totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal
      ),
      totalBeforeDiscount: cart.cartTotal,
      couponApplied,
    });
    console.log("first data : ", data);
    return data;
  } catch (err: any) {
    console.log("** createOrder : err.message : ", err.message);
    console.log(
      "** createOrder : err.response.data.message : ",
      err.response.data.message
    );
    return err.response.data.message;
  }
};
