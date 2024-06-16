import db from "@/lib/db";
import { delayExec } from "@/lib/utils";
import User from "@/models/db/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/users/limit/GET");
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit: number = (searchParams.get("limit") || 0) as number;
    await db.ConnectDB();
    const users = await User.find({ role: "user" })
      .limit(limit)
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();
    if (!users) {
      await db.DisconnectDB();
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }
    await db.DisconnectDB();
    await delayExec(3000); // remove later
    console.log("api/admin/dashboard/users/limit/GET disconnected");
    return NextResponse.json({ users }, { status: 200 });
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/orderr/users/GET failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
