import db from "@/lib/db";
import SubCategory from "@/models/db/subcategory";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("In api/admin/dashboard/subcategories/bycategory/GET request");
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category");
    console.log("category : ", category);
    if (!category) {
      console.log("category is required");
      return NextResponse.json({ message: "category is required" });
    }
    await db.ConnectDB();
    let subCategoryByParent = await SubCategory.find({ parent: category })
      .select("name")
      .sort({ createdAt: -1 })
      .lean();
    if (!subCategoryByParent) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "subcategory not found for parent" },
        { status: 404 }
      );
    }
    await db.DisconnectDB();
    return NextResponse.json({ subCategoryByParent }, { status: 200 });
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/products/parents failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
