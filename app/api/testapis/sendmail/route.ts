import { NextResponse, NextRequest } from "next/server";
import EmailHeader from "@/templates/email/header";
import { sendEmail } from "@/lib";

export const POST = async (req: NextRequest) => {
  console.log("in api/testapis/sendmail");
  try {
    await sendEmail(
      "sajin.soman1990@gmail.com",
      "http://www.google.com",
      "",
      "Reset your password",
      EmailHeader
    );
    return NextResponse.json({ message: "mail sent shayad" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "mail not sent" }, { status: 500 });
  }
};
