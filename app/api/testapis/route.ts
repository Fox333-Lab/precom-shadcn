import { NextResponse, NextRequest } from "next/server";
import { createPwdResetToken, verifyResetPwdJwtToken } from "@/lib";
import { JwtPayload } from "@/types/misc/jwtpayload";

export const POST = async (req: NextRequest) => {
  try {
    console.log("in test api request");
    const { id } = await req.json();
    console.log("test api request : email : ", id);
    const resetToken = createPwdResetToken({
      id: id.toString(),
    });
    const token = verifyResetPwdJwtToken(resetToken) as JwtPayload;
    console.log("test api request : token : ", token.id);
    return new NextResponse(JSON.stringify(resetToken), {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
