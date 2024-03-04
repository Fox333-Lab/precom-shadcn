import { ShippingInputTypes } from "@/types/validation/shipping";
import axios from "axios";

export const saveAddressToDB = async (
  newAddress: ShippingInputTypes,
  userId: string
) => {
  console.log("In functions/shipping/saveAddressToDB : userId : ", userId);
  try {
    const { data } = await axios.put("/api/user/shipping/saveaddresstodb", {
      newAddress,
      userId,
    });
    return data;
  } catch (err: any) {
    console.log("** saveAddressToDB : err.message : ", err.message);
    return err.response.data.message;
  }
};

export const changeActiveAddress = async (addressId: string) => {
  console.log(
    "In functions/shipping/changeActiveAddress : addressId : ",
    addressId
  );
  try {
    const { data } = await axios.put("/api/user/shipping/manageaddress", {
      addressId,
    });
    return data;
  } catch (err: any) {
    console.log("** changeActiveAddress : err.message : ", err.message);
    return err.response.data.message;
  }
};

export const deleteAddress = async (addressId: string) => {
  console.log(
    "Inside functions/shipping/deleteAddress : addressId : ",
    addressId
  );
  try {
    const { data } = await axios.delete("/api/user/shipping/manageaddress", {
      data: { addressId },
    });
    return data;
  } catch (err: any) {
    console.log("** deleteAddress : err.message : ", err.message);
    return err.response.data.message;
  }
};

export const applyCoupon = async (coupon: string) => {
  console.log("In functions/shipping/applycoupon : coupon : ", coupon);
  // try {
  const { data } = await axios.post("/api/user/shipping/applycoupon", {
    coupon,
  });
  return data;
  // } catch (err: any) {
  //   console.log("** applyCoupon : err.message : ", err.message);
  //   return null;
  // }
};
