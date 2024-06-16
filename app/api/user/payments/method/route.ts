import User from "@/models/db/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import db from "@/lib/db";

export const PUT = async (req: NextRequest) => {
  console.log("in api/user/payments/method PUT file");
  const userSession = await getServerSession(authOptions);
  try {
    const userId = userSession?.user.uid;
    await db.ConnectDB();
    let { defaultPaymentMethod }: { defaultPaymentMethod: string } =
      await req.json();
    console.log(
      "in api/user/payments/method PUT defaultPaymentMethod : ",
      defaultPaymentMethod
    );
    // console.log("in api/user/saveaddresstodb userId : ", userId);
    const user = await User.findById(userId);

    if (!user) {
      console.log("in api/user/payments/method PUT user : ", user);
      await db.DisconnectDB();
      return NextResponse.json({ message: "No user exists" }, { status: 404 });
    }
    user.defaultPaymentMethod = defaultPaymentMethod;
    await user.save();
    console.log("in api/user/payments/method PUT after save");
    await db.DisconnectDB();
    return NextResponse.json(
      {
        paymentMethod: user.defaultPaymentMethod,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("in api/user/payments/method PUT catch");
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
