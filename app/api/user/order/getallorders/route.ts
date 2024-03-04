import db from "@/lib/db";
import Order from "@/models/db/order";
import User from "@/models/db/user";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await db.ConnectDB();
    console.log("api/user/order/getallorders orderId : ");
    //const order = await Order.findById(orderId).populate("user").lean();
    const orders = await Order.find({}).lean();
    //console.log("api/user/cart/[userid] user.address : ", user.address);

    // console.log("api/user/order/[id] order : ", order);

    await db.DisconnectDB();
    console.log("api/user/order/[id] disconnected ");
    return NextResponse.json({ orders }, { status: 200 });
  } catch (err: any) {
    console.log("catch : api/user/order/getallorders failed : ", err.message);
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
