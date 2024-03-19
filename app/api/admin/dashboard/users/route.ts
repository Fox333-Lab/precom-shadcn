import db from "@/lib/db";
import User from "@/models/db/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/users/GET");
  try {
    await db.ConnectDB();
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
    if (!users) {
      await db.DisconnectDB();
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }
    await db.DisconnectDB();
    console.log("api/admin/dashboard/users/GET disconnected");
    return NextResponse.json({ users }, { status: 200 });
  } catch (err: any) {
    console.log("catch : api/admin/dashboard/users/GET failed : ", err.message);
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
