import db from "@/lib/db";
import Order from "@/models/db/order";
import User from "@/models/db/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userid: string } }
) => {
  console.log("In the api/admin/dashboard/users/[userid]/GET");
  try {
    const userid = params.userid;
    console.log("userid : ", userid);
    await db.ConnectDB();
    const user = await User.findById({ _id: userid })
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    if (!user) {
      await db.DisconnectDB();
      return NextResponse.json({ message: "No user found" }, { status: 404 });
    }

    const userOrders = await Order.find({ user: userid }).lean();

    if (!userOrders) {
      await db.DisconnectDB();
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }

    console.log("userOrders : ", userOrders);

    console.log("user : ", user);
    await db.DisconnectDB();
    console.log("api/admin/dashboard/users/[userid]/GET disconnected");
    return NextResponse.json({ user, userOrders }, { status: 200 });
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/users/[userid]/GET failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
