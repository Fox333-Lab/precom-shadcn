import { validateEmail, createActivationToken, sendEmail } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/db/user";
import { ActivateEmailTemplate } from "@/templates/email/activateEmailTemplate";
import mongoose from "mongoose";
import db from "@/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    console.log("in sign up request");
    await db.ConnectDB();
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      console.log("in required check");
      return new NextResponse(
        JSON.stringify({ message: "Please fill all details" }),
        { status: 400 }
      );
    }
    if (email && !validateEmail(email)) {
      console.log("in email check");
      return new NextResponse(JSON.stringify({ message: "Invalid email" }), {
        status: 400,
      });
    }
    // const { validEmail, message } = await validateEmail(email);
    // if (!validEmail) {
    //   console.log("in email check");
    //   return new NextResponse(JSON.stringify({ message: message }), {
    //     status: 400,
    //   });
    // }
    console.log("in sign up request finding user");
    const user = await User.findOne({ email });
    if (user) {
      console.log("found user");
      return new NextResponse(
        JSON.stringify({ message: "This email already exists" }),
        {
          status: 400,
        }
      );
    }
    console.log("in sign up request encrypting password");
    const encryptedPwd = await bcrypt.hash(password, 12);
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: encryptedPwd,
    });
    console.log("in sign up request before save");
    const userAdded = await newUser.save();
    console.log("in sign up request after save");
    const activationToken = createActivationToken({
      id: userAdded._id.toString(),
    });
    console.log("activationToken : ", activationToken);
    // const activationToken = "frgthy456yj";
    const activationUrl = `${process.env.BASE_URL}/activate/${activationToken}`;
    await sendEmail(
      email,
      activationUrl,
      "",
      "Activate Your account",
      ActivateEmailTemplate
    );
    await db.DisconnectDB();
    // return new NextResponse(
    //   JSON.stringify({ message: "registration success" }),
    //   {
    //     status: 200,
    //   }
    // );
  } catch (err: any) {
    console.log("err.message : ", err.message);
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
