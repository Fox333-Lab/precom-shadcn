import db from "@/lib/db";
import Order from "@/models/db/order";
import User from "@/models/db/user";
import IOrder from "@/types/db/order";
import { NextRequest, NextResponse } from "next/server";

import { sorders } from "@/data/MOCK_DATA_ORDERS";

export const GET = async (
  req: NextRequest,
  { params }: { params: { orderid: string } }
) => {
  console.log(`In the api/admin/dashboard/order/details/${params.orderid}/GET`);
  try {
    const orderid = params.orderid;
    await db.ConnectDB();
    // const order: IOrder = (await Order.findById({ _id: orderid })
    //   .populate({ path: "user", model: User, select: "-password" })
    //   .sort({ createdAt: -1 })
    //   .lean()) as IOrder;
    const order: IOrder = sorders.find(
      (order) => order._id === orderid
    ) as unknown as IOrder;
    if (!order) {
      await db.DisconnectDB();
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }
    await db.DisconnectDB();
    console.log("api/admin/dashboard/order/details/orderid/GET disconnected");
    return NextResponse.json({ order }, { status: 200 });
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/order/details/orderid/GET failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
