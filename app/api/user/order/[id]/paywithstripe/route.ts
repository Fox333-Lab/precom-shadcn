import db from "@/lib/db";
import Order from "@/models/db/order";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  console.log("In the api/user/order/[id]/paywithstripe/route.ts file");
  try {
    await db.ConnectDB();
    console.log("api/user/order/[id]/paywithstripe params.id : ", params.id);
    const orderId = params.id;
    const { amount, id }: { amount: number; id: string } = await req.json();
    if (id && amount) {
      console.log("api/user/order/[id]/paywithstripe orderId : ", orderId);
      const payment = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "USD",
        description: "Precom Store",
        payment_method: id,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never",
        },
      });
      console.log("first payment : ", payment);
      if (orderId) {
        const order = await Order.findById(orderId);
        if (order) {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentResult = {
            id: payment.id,
            status: payment.status,
            email_address: payment.receipt_email,
          };
          const updatedOrder = await order.save();
          console.log("updatedOrder : ", updatedOrder);

          await db.DisconnectDB();
          return NextResponse.json(
            { message: "Payment sucess", success: true },
            { status: 200 }
          );
        } else {
          await db.DisconnectDB();
          return NextResponse.json(
            { message: "Order not found" },
            { status: 404 }
          );
        }
      } else {
        await db.DisconnectDB();
        throw new Error("Payment failed : no order id provided");
      }
    } else {
      await db.DisconnectDB();
      throw new Error("Payment failed: no payment id or amount provided");
    }
  } catch (err: any) {
    console.log(
      "catch : api/user/order/[id]/paywithstripe failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
