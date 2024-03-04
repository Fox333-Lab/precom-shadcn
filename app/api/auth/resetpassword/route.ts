import { createPwdResetToken, verifyResetPwdJwtToken } from "@/lib";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/db/user";
import bcrypt from "bcryptjs";
import { JwtPayload } from "@/types/misc/jwtpayload";
import db from "@/lib/db";

export const POST = async (req: NextRequest) => {
  console.log("in reset password request GET");
  const { rid } = await req.json();
  console.log("reset password request : rid : ", rid);
  try {
    const tt = createPwdResetToken({ id: rid });
    console.log("reset password request : creating token : ", tt);

    return new NextResponse(JSON.stringify({ token: tt }), {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};

export const PUT = async (req: NextRequest) => {
  console.log("in reset password request POST");
  const { resetid, new_password } = await req.json();
  try {
    const token = verifyResetPwdJwtToken(resetid) as JwtPayload;
    console.log("reset password page : token : ", token);
    await db.ConnectDB();
    console.log("before hasing : ", new_password);
    const password = await bcrypt.hash(new_password, 12);
    console.log("after hashing : ", password);
    const user = await User.findByIdAndUpdate(token.id, { password });
    console.log("updated user : ", user);
    if (!user) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "Reset link expired, request a new link" },
        { status: 404 }
      );
    }
    await db.DisconnectDB();
    return new NextResponse(JSON.stringify({ email: user.email }), {
      status: 200,
    });
  } catch (err: any) {
    await db.DisconnectDB();
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
