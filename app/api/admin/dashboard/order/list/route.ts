import db from "@/lib/db";
import Order from "@/models/db/order";
import User from "@/models/db/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/order/list/GET");
  try {
    await db.ConnectDB();
    const orders = await Order.find({})
      .populate({ path: "user", model: User, select: "-password" })
      .sort({ createdAt: -1 })
      .lean();
    if (!orders) {
      await db.DisconnectDB();
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }
    await db.DisconnectDB();
    console.log("api/admin/dashboard/order/list/GET disconnected");
    return NextResponse.json({ orders }, { status: 200 });
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/orderr/list/GET failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
