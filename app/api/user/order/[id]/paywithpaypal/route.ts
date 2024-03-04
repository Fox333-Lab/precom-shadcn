import db from "@/lib/db";
import Order from "@/models/db/order";
import User from "@/models/db/user";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await db.ConnectDB();
    console.log("api/user/order/[id]/paywithpaypal params.id : ", params.id);
    const orderId = params.id;
    const { details, order_id }: { details: any; order_id: string } =
      await req.json();
    if (orderId) {
      console.log("api/user/order/[id]/paywithpaypal orderId : ", orderId);
      console.log("api/user/order/[id]/paywithpaypal order_id : ", order_id);
      const order = await Order.findById(order_id);
      //console.log("api/user/cart/[userid] user.address : ", user.address);
      if (order) {
        console.log("api/user/order/[id]/paywithpaypal details : ", details);
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: order_id,
          status: details.status,
          email_address: details.payer.email_address,
        };
        const newOrder = await order.save();
        console.log("updatedOrder : ", newOrder);
        await db.DisconnectDB();
        return NextResponse.json(
          { message: "Paypal Payment sucess", order: newOrder },
          { status: 200 }
        );
      } else {
        await db.DisconnectDB();
        return NextResponse.json(
          { message: "order not found" },
          { status: 404 }
        );
      }
    } else {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "Invalid order id" },
        { status: 400 }
      );
    }
  } catch (err: any) {
    console.log(
      "catch : api/user/order/[id]/paywithpaypal failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
