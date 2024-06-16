import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ICoupon from "@/types/db/coupon";
import { CouponListItem } from ".";

type CouponListPropsTypes = {
  coupons: ICoupon[];
  setCoupons: React.Dispatch<React.SetStateAction<ICoupon[]>>;
};

const CouponList = ({ coupons, setCoupons }: CouponListPropsTypes) => {
  console.log("couponlist coupons : ", coupons);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {coupons.map((coupon) => (
            <CouponListItem
              key={coupon._id.toString()}
              coupon={coupon}
              setCoupons={setCoupons}
            />
          ))} */}
          {coupons.map((coupon) => (
            <CouponListItem
              key={coupon._id.toString()}
              coupon={coupon}
              setCoupons={setCoupons}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CouponList;
