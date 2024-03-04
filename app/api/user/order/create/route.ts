import User from "@/models/db/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { IAddress } from "@/types/db/user";
import db from "@/lib/db";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { ICartProduct } from "@/types/db/cart";
import Order from "@/models/db/order";
import { IOrderProduct } from "@/types/db/order";

export const POST = async (req: NextRequest) => {
  console.log("in api/user/order/create post file");
  const userSession = await getServerSession(authOptions);
  try {
    // console.log("in api/user/saveaddresstodb userSession : ", userSession);
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }: {
      products: ICartProduct[];
      shippingAddress: IAddress;
      paymentMethod: string;
      total: number;
      totalBeforeDiscount: number;
      couponApplied: string;
    } = await req.json();
    await db.ConnectDB();
    const userId = userSession?.user.uid;
    console.log("userid : ", userId);
    const user = await User.findById(userSession?.user.uid);
    const newOrderProducts = products.map((product) => {
      return {
        product: product._id,
        name: product.name,
        image: product.image,
        size: product.size,
        qty: product.pqty,
        color: product.color,
        price: product.price,
      } as unknown as IOrderProduct;
    });
    console.log("first newOrderProducts : ", newOrderProducts);
    const newOrder = await new Order({
      user: user._id,
      products: newOrderProducts,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();

    await db.DisconnectDB();
    console.log("disconnected");
    return new NextResponse(JSON.stringify({ order_id: newOrder._id }), {
      status: 200,
    });
  } catch (err: any) {
    await db.DisconnectDB();
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
