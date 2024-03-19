import ICoupon from "@/types/db/coupon";
import React, { useState } from "react";
import { CouponList, Create } from ".";

const Coupons = ({ coupons }: { coupons: ICoupon[] }) => {
  const [data, setData] = useState(coupons);
  return (
    <div className="flex flex-col gap-6">
      <Create setCoupons={setData} />
      <CouponList coupons={data} setCoupons={setData} />
    </div>
  );
};

export default Coupons;
