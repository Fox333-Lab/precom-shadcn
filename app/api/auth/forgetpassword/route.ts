import { db, validateEmail, createPwdResetToken, sendEmail } from "@/lib";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/db/user";
import { resetPasswordEmailTemplate } from "@/templates/email/resetPwdEmailTemplate";

export const POST = async (req: NextRequest) => {
  try {
    console.log("in forgot password request");
    await db.ConnectDB();
    const { email } = await req.json();
    if (!email) {
      console.log("in required check");
      return new NextResponse(
        JSON.stringify({ message: "Please enter email" }),
        { status: 400 }
      );
    }
    console.log("in forgot password after email null check");
    if (email && !validateEmail(email)) {
      console.log("in email check");
      return new NextResponse(JSON.stringify({ message: "Invalid Email" }), {
        status: 400,
      });
    }
    console.log("in forgot password after email format validation");
    const user = await User.findOne({ email });
    if (!user) {
      console.log("forget password : found no user");
      return new NextResponse(
        JSON.stringify({ message: "This email doesn't exists" }),
        {
          status: 404,
        }
      );
    }
    console.log("in forgot password after finsing user");
    // const encryptedPwd = await bcrypt.hash(password, 12);
    // const newUser = new User({ name, email, password: encryptedPwd });
    // const userAdded = await newUser.save();
    const resetToken = createPwdResetToken({
      id: user._id.toString(),
    });
    console.log("in forgot password after creating token");
    const resetPwdUrl = `${process.env.BASE_URL}/resetpassword/${resetToken}`;
    await sendEmail(
      email,
      resetPwdUrl,
      "",
      "Reset your password",
      resetPasswordEmailTemplate
    );
    console.log("in forgot password after sending email");
    await db.DisconnectDB();
    return new NextResponse(
      JSON.stringify({ message: "reset password success" }),
      {
        status: 200,
      }
    );
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
