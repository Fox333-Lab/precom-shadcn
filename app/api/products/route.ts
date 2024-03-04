import db from "@/lib/db";
import Product from "@/models/db/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("In api/product request");
  try {
    await db.ConnectDB();
    let allProducts = await Product.find().sort({ createdAt: -1 }).lean();
    if (!allProducts) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "products not found" },
        { status: 404 }
      );
    }
    await db.DisconnectDB();
    return NextResponse.json({ products: allProducts }, { status: 200 });
  } catch (err: any) {
    console.log("catch : api/product failed : ", err.message);
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
