import db from "@/lib/db";
import { filterArray, removeDuplicates } from "@/lib/utils";
import Category from "@/models/db/category";
import Product from "@/models/db/product";
import SubCategory from "@/models/db/subcategory";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("In api/products/details/browse GET");
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
    let categories = await Category.find().lean();
    let subCategories = await SubCategory.find()
      .populate({ path: "parent", model: Category })
      .lean();
    let colors = await Product.find().distinct("subProducts.color.color");
    let brands = await Product.find().distinct("brand");
    let sizes = await Product.find().distinct("subProducts.sizes.size");
    let details = await Product.find().distinct("details");
    let styles = filterArray(details, "Style");
    let patterns = filterArray(details, "Pattern type");
    let materials = filterArray(details, "Material");
    let distinctStyles = removeDuplicates(styles);
    let distinctPaterns = removeDuplicates(patterns);
    let distinctMaterials = removeDuplicates(materials);
    await db.DisconnectDB();
    return NextResponse.json({ products: allProducts }, { status: 200 });
  } catch (err: any) {
    console.log("catch : api/product failed : ", err.message);
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
