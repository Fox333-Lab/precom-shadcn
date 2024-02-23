import db from "@/lib/db";
import Coupon from "@/models/db/coupon";
import ICoupon from "@/types/db/coupon";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await db.ConnectDB();
    const { coupon, startDate, endDate, discount }: ICoupon = await req.json();
    const couponExists = await Coupon.findOne({ coupon });
    if (couponExists) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "coupon already exists" },
        { status: 400 }
      );
    }
    await new Coupon({
      coupon,
      startDate,
      endDate,
      discount,
    }).save();
    const allCoupons = await Coupon.find().sort({ createdAt: -1 }).lean();
    await db.DisconnectDB();
    return NextResponse.json(
      { message: "Coupon added successfully", coupons: allCoupons },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("catch : api/product failed : ", err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
