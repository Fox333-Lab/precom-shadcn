import db from "@/lib/db";
import Category from "@/models/db/category";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export const GET = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/categories/route.ts file");
  try {
    await db.ConnectDB();
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
    await db.DisconnectDB();
    console.log("api/admin/dashboard/categories/route.ts disconnected");
    return NextResponse.json({ categories }, { status: 200 });
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/categories/route.ts failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/categories/route.ts file");
  try {
    const { name } = await req.json();
    await db.ConnectDB();
    const category = await Category.findOne({ name });
    if (category) {
      return NextResponse.json(
        { message: "Category already exist" },
        { status: 400 }
      );
    }
    await new Category({ name, slug: slugify(name) }).save();
    await db.DisconnectDB();
    console.log("api/admin/dashboard/categories/route.ts disconnected");
    return NextResponse.json(
      {
        message: `Categort ${name} created successfully`,
        categories: await Category.find({}).sort({ updatedAt: -1 }),
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/categories/route.ts failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
