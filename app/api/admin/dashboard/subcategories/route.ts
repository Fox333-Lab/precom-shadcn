import db from "@/lib/db";
import Category from "@/models/db/category";
import SubCategory from "@/models/db/subcategory";
import ICategory from "@/types/db/category";
import ISubCategory from "@/types/db/subcategory";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export const GET = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/subcategories/GET");
  try {
    await db.ConnectDB();
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
    const subCategories = await SubCategory.find({})
      .populate({ path: "parent", model: Category })
      .sort({ updatedAt: -1 })
      .lean();
    await db.DisconnectDB();
    console.log("api/admin/dashboard/subcategories/GET disconnected");
    return NextResponse.json({ categories, subCategories }, { status: 200 });
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/subcategories/GET failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/subcategories/POST file");
  try {
    const { name, parent } = await req.json();
    await db.ConnectDB();
    const subCategory = await SubCategory.findOne({ name });
    if (subCategory) {
      return NextResponse.json(
        { message: "Sub-Category already exist" },
        { status: 400 }
      );
    }
    const lowerCaseName = name.toLowerCase();
    console.log("parent : ", parent);
    let parentCat: ICategory = (await Category.findOne({ name: parent }).select(
      "_id"
    )) as ICategory;
    console.log("parentID : ", parentCat?._id.toString());
    if (!parentCat) {
      return NextResponse.json(
        { message: "Select parent category not found" },
        { status: 400 }
      );
    }
    await new SubCategory({
      name,
      parent: parentCat?._id,
      slug: slugify(lowerCaseName),
    }).save();
    await db.DisconnectDB();
    console.log("api/admin/dashboard/subcategories/POST disconnected");
    return NextResponse.json(
      {
        message: `Sub-Category ${name} created successfully`,
        success: true,
        subCategories: (await SubCategory.find({})
          .populate({ path: "parent", model: Category })
          .sort({ updatedAt: -1 })
          .lean()) as ISubCategory[],
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
  console.log("In the api/admin/dashboard/subcategories/PUT");
  try {
    const { subCategoryID, subCategoryName, subCategoryParent } =
      await req.json();
    const updatedSlug = slugify(subCategoryName.toLocaleLowerCase());
    await db.ConnectDB();
    const subCategory = await SubCategory.findById(subCategoryID);
    if (!subCategory) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "Sub-Category not found" },
        { status: 400 }
      );
    }
    subCategory.name = subCategoryName;
    subCategory.slug = updatedSlug;
    subCategory.parent = subCategoryParent;
    const savedSubCat = await subCategory.save();
    if (!savedSubCat) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "Unable to update sub-category" },
        { status: 400 }
      );
    }
    await db.DisconnectDB();
    console.log("api/admin/dashboard/subcategories/PUT disconnected");
    const updatedSubCats = (await SubCategory.find({})
      .populate({ path: "parent", model: Category })
      .sort({ updatedAt: -1 })
      .lean()) as ISubCategory[];
    return NextResponse.json(
      {
        message: "Sub-Category updated successfully",
        success: true,
        updatedSlug: updatedSlug,
        subCategories: updatedSubCats,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/subcategories/PUT failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/subcategories/DELETE");
  try {
    const { subCategoryID } = await req.json();
    await db.ConnectDB();
    const deletedSubCat = await SubCategory.findByIdAndDelete(subCategoryID);
    if (!deletedSubCat) {
      return NextResponse.json(
        { message: "Sub-Category not found" },
        { status: 400 }
      );
    }
    await db.DisconnectDB();
    console.log("api/admin/dashboard/subcategories/DELETE disconnected");
    return NextResponse.json(
      {
        message: "Sub-Category deleted successfully",
        success: true,
        // categories: await Category.find({}).sort({ updatedAt: -1 }),
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/subcategories/DELETE failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 }
    );
  }
};
