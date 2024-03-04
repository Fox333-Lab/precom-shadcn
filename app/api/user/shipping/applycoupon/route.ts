import User from "@/models/db/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { IAddress } from "@/types/db/user";
import mongoose from "mongoose";
import Coupon from "@/models/db/coupon";
import Cart from "@/models/db/cart";
import db from "@/lib/db";
import { authOptions } from "../../../auth/[...nextauth]/route";

export const POST = async (req: NextRequest) => {
  console.log("in api/user/shiping/applyCoupon post file");
  const userSession = await getServerSession(authOptions);
  try {
    // console.log("in api/user/saveaddresstodb userSession : ", userSession);
    const { coupon }: { coupon: string } = await req.json();
    console.log("coupon : ", coupon);
    await db.ConnectDB();
    const userId = userSession?.user.uid;
    console.log("userid : ", userId);
    const user = await User.findById(userSession?.user.uid);
    console.log("user : ", user);
    const checkCoupon = await Coupon.findOne({ coupon });
    console.log("checkCoupon : ", checkCoupon);
    if (checkCoupon == null) {
      console.log("checkCoupon : ", checkCoupon);
      await db.DisconnectDB();
      return new NextResponse(JSON.stringify({ message: "Invalid Coupon" }));
    }
    const { cartTotal } = await Cart.findOne({ user: userId });
    console.log("cartTotal : ", cartTotal);
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * checkCoupon.discount) / 100
    ).toFixed(2);
    console.log("totalAfterDiscount : ", totalAfterDiscount);

    await db.DisconnectDB();
    console.log("disconnected");
    return new NextResponse(
      JSON.stringify({ totalAfterDiscount, discount: checkCoupon.discount }),
      {
        status: 200,
      }
    );
  } catch (err: any) {
    await db.DisconnectDB();
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
