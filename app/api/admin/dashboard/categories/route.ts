import db from "@/lib/db";
import Category from "@/models/db/category";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export const GET = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/categories/GET");
  try {
    await db.ConnectDB();
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
    if (!categories) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "No categories found" },
        { status: 404 }
      );
    }
    await db.DisconnectDB();
    console.log("api/admin/dashboard/categories/GET disconnected");
    return NextResponse.json({ categories }, { status: 200 });
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/categories/GET failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/categories/POST file");
  try {
    const { name } = await req.json();
    await db.ConnectDB();
    const category = await Category.findOne({ name });
    if (category) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "Category already exist" },
        { status: 400 }
      );
    }
    const lowerCaseName = name.toLowerCase();
    await new Category({ name, slug: slugify(lowerCaseName) }).save();
    await db.DisconnectDB();
    console.log("api/admin/dashboard/categories/POST disconnected");
    return NextResponse.json(
      {
        message: `Categort ${name} created successfully`,
        categories: await Category.find({}).sort({ updatedAt: -1 }),
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/categories/POST failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/categories/PUT");
  try {
    const { categoryID, categoryName } = await req.json();
    const updatedSlug = slugify(categoryName);
    await db.ConnectDB();
    const category = await Category.findById(categoryID);
    category.name = categoryName;
    category.slug = updatedSlug;
    await category.save();
    await db.DisconnectDB();
    console.log("api/admin/dashboard/categories/PUT disconnected");
    return NextResponse.json(
      {
        message: "Category updated successfully",
        success: true,
        updatedSlug: updatedSlug.toLocaleLowerCase(),
        // categories: await Category.find({}).sort({ updatedAt: -1 }),
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/categories/PUT failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/categories/DELETE file");
  try {
    const { categoryID } = await req.json();
    await db.ConnectDB();
    await Category.findByIdAndDelete(categoryID);
    await db.DisconnectDB();
    console.log("api/admin/dashboard/categories/DELETE disconnected");
    return NextResponse.json(
      {
        message: "Category deleted successfully",
        success: true,
        // categories: await Category.find({}).sort({ updatedAt: -1 }),
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/categories/DELETE failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 }
    );
  }
};
