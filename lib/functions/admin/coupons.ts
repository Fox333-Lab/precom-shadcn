import axios from "axios";

export const createCoupon = async (
  couponName: string,
  discount: number,
  startDate: string,
  endDate: string
) => {
  console.log("In functions/admin/categories/createCoupon");
  console.log("In functions/admin/categories/createCoupon : ", couponName);

  const { data } = await axios.post("/api/admin/dashboard/coupons", {
    couponName,
    discount,
    startDate,
    endDate,
  });
  return data;
};

export const deleteCoupon = async (couponID: string) => {
  console.log("In functions/admin/categories/deleteCoupon");
  console.log("In functions/admin/categories/deleteCoupon : ", couponID);

  const { data } = await axios.delete("/api/admin/dashboard/coupons", {
    data: { couponID },
  });
  return data;
};

export const updateCoupon = async (
  couponID: string,
  couponName: string,
  discount: string,
  startDate: string,
  endDate: string
) => {
  console.log("In functions/admin/categories/updateCoupon");
  console.log("In functions/admin/categories/updateCoupon : ", couponID);
  // try {
  const { data } = await axios.put("/api/admin/dashboard/coupons", {
    couponID,
    couponName,
    discount,
    startDate,
    endDate,
  });
  return data;
  // } catch (err: any) {
  //   console.log("In functions/admin/createCategory : ", err.message);
  //   return null;
  // }
};
