import { NextResponse, NextRequest } from "next/server";
import User from "@/models/db/user";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { authOptions } from "../[...nextauth]/route";

export const PUT = async (req: NextRequest) => {
  console.log("in reset password request POST");
  const { old_password, new_password } = await req.json();
  const userSession = await getServerSession(authOptions);
  try {
    //const token = verifyResetPwdJwtToken(resetid) as JwtPayload;
    //console.log("reset password page : token : ", token);
    const userId = userSession?.user.uid;
    await db.ConnectDB();
    const user = await User.findById(userId);

    if (!user) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "No user exist", success: false },
        { status: 404 }
      );
    }

    // verify old password
    const isMatch = await bcrypt.compare(old_password, user.password);

    if (!isMatch) {
      console.log("Invalid old password entered");
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "Invalid old password entered", success: false },
        { status: 401 }
      );
    }
    const encryptedNewPassword = await bcrypt.hash(new_password, 12); // hashing new password
    user.password = encryptedNewPassword;
    await user.save();
    await db.DisconnectDB();
    return NextResponse.json(
      { message: "Password Updated Successfully", success: true },
      { status: 200 }
    );
  } catch (err: any) {
    await db.DisconnectDB();
    return new NextResponse(
      JSON.stringify({ error: err.message, success: false }),
      {
        status: 500,
      }
    );
  }
};
