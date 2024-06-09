import { MailChimpHandler } from "@/lib/functions";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    console.log("in api/subscribe/newsletter");
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { error: "Please provide an email address" },
        { status: 400 }
      );
    }
    const { url, data, headers } = MailChimpHandler(email);

    await axios.post(url, data, { headers });
    return NextResponse.json(
      { message: "You have been successfully subscribed to our newsletter" },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
};
