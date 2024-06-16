import db from "@/lib/db";
import { delayExec } from "@/lib/utils";
import Order from "@/models/db/order";
import User from "@/models/db/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userid: string } }
) => {
  console.log("In the api/user/dashboard/overview/[userid] GET");
  try {
    const userid = params.userid;
    console.log("userid : ", userid);
    await db.ConnectDB();
    const user = await User.findById({ _id: userid })
      .select("-password")
      .sort({ createdAt: -1 });

    if (!user) {
      await db.DisconnectDB();
      return NextResponse.json({ message: "No user found" }, { status: 404 });
    }

    const addressCount = user.address.length.toString();

    const orderCount = (await Order.find({ user: userid })).length.toString();

    // await delayExec(10000);

    console.log("totalOrders : ", orderCount);
    await db.DisconnectDB();
    console.log("api/user/dashboard/overview/[userid] GET disconnected");
    return NextResponse.json(
      { user, orderCount, addressCount },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(
      "catch : api/user/dashboard/overview/[userid] GET failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
