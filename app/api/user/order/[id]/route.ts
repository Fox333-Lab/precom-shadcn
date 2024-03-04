import db from "@/lib/db";
import Order from "@/models/db/order";
import User from "@/models/db/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await db.ConnectDB();

    console.log("api/user/order/[id] params.id : ", params.id);
    const orderId = params.id;
    if (orderId) {
      // console.log("api/user/order/[id] orderId : ", orderId);

      //const order = await Order.findById(orderId).populate("user").lean();
      const order = await Order.findById(orderId)
        .populate({ path: "user", model: User })
        .lean();
      //console.log("api/user/cart/[userid] user.address : ", user.address);

      // console.log("api/user/order/[id] order : ", order);

      await db.DisconnectDB();
      console.log("api/user/order/[id] disconnected ");
      return NextResponse.json({ order }, { status: 200 });
    } else {
      throw new Error("Order id is required");
    }
  } catch (err: any) {
    console.log("catch : api/user/order/[id] failed : ", err.message);
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
