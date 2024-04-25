import db from "@/lib/db";
import Category from "@/models/db/category";
import Product from "@/models/db/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("In api/admin/dashboard/products/parents/GET request");
  try {
    await db.ConnectDB();
    let parents = await Product.find()
      .select("name subProducts")
      .sort({ createdAt: -1 })
      .lean();
    if (!parents) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "products not found" },
        { status: 404 }
      );
    }
    const categories = await Category.find({}).lean();
    if (!categories) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "No categories found" },
        { status: 404 }
      );
    }
    await db.DisconnectDB();
    return NextResponse.json({ parents, categories }, { status: 200 });
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/products/parents failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
