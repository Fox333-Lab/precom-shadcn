import db from "@/lib/db";
import { delayExec } from "@/lib/utils";
import Order from "@/models/db/order";
import User from "@/models/db/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/order/limit/GET");
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit: number = (searchParams.get("limit") || 0) as number;
    await db.ConnectDB();
    const orders = await Order.find({})
      .limit(limit)
      .populate({ path: "user", model: User, select: "-password" })
      .sort({ createdAt: -1 })
      .lean();
    if (!orders) {
      await db.DisconnectDB();
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }
    await db.DisconnectDB();
    await delayExec(5000); // remove later
    console.log("api/admin/dashboard/order/limit/GET disconnected");
    return NextResponse.json({ orders }, { status: 200 });
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/orderr/limit/GET failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
