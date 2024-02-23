import User from "@/models/db/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { IAddress } from "@/types/db/user";
import mongoose from "mongoose";
import Coupon from "@/models/db/coupon";
import Cart from "@/models/db/cart";
import db from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/route";

export const PUT = async (req: NextRequest) => {
  console.log("in api/user/saveaddresstodb post request");
  const userSession = await getServerSession(authOptions);
  try {
    // console.log("in api/user/saveaddresstodb userSession : ", userSession);
    const { coupon }: { coupon: string } = await req.json();
    await db.ConnectDB();
    const userId = userSession?.user.uid;
    const user = User.findById(userSession?.user.uid);

    const checkCoupon = await Coupon.findOne({ coupon });
    if (!checkCoupon) {
      return new NextResponse(JSON.stringify({ message: "Invalid Coupon" }), {
        status: 400,
      });
    }
    const { cartTotal } = await Cart.findOne({ user: userId });
    let totalAfterDiscount =
      cartTotal - (cartTotal * checkCoupon.discount) / 100;

    await db.DisconnectDB();
    return new NextResponse(
      JSON.stringify({ totalAfterDiscount, discount: checkCoupon.discount }),
      {
        status: 200,
      }
    );
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
