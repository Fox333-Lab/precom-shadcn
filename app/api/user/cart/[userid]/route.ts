import db from "@/lib/db";
import Cart from "@/models/db/cart";
import User from "@/models/db/user";
import ICart from "@/types/db/cart";
import IUser from "@/types/db/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userid: string } }
) => {
  try {
    db.ConnectDB();

    console.log("api/user/cart/[userid] params.userid : ", params.userid);
    const uid = params.userid;
    if (uid) {
      console.log("api/user/cart/[userid] uid : ", uid);

      const user = (await User.findById(uid)) as IUser;
      //console.log("api/user/cart/[userid] user.address : ", user.address);
      const cart = (await Cart.findOne({ user: user._id })) as ICart;
      console.log("api/user/cart/[userid] cart : ", cart);

      db.DisconnectDB();
      console.log("api/user/cart/[userid] disconnected ");
      return NextResponse.json({ cart, user }, { status: 200 });
    } else {
      throw new Error("User id is required");
    }
  } catch (err: any) {
    console.log("catch : api/user/cart/[userid] failed : ", err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
