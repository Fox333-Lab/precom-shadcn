import db from "@/lib/db";
import Category from "@/models/db/category";
import Product from "@/models/db/product";
import IProduct, { ISubProduct, TAdminAllProduct } from "@/types/db/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("In api/admin/dashboard/products/list/GET request");
  try {
    await db.ConnectDB();
    let allProducts = await Product.find({})
      .sort({ createdAt: -1 })
      .populate({ path: "category", model: Category })
      .lean();
    if (!allProducts) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "products not found" },
        { status: 404 }
      );
    }
    let subPro: TAdminAllProduct[] = [];
    const mergedProducts = allProducts?.map((product) => {
      subPro.push(
        product.subProducts?.map((subProduct: ISubProduct) => {
          return {
            _id: String(product._id),
            subProductId: String(subProduct._id),
            name: product.name,
            brand: product.brand,
            sku: subProduct.sku,
            category: product.category.name,
            shipping: product.shipping,
            size: subProduct.sizes,
            // inStock: subProduct,
            image: subProduct.color.image,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
          } as unknown as TAdminAllProduct;
        })
      );
    });
    const products = subPro.flat();
    console.log("first products : ", products);
    await db.DisconnectDB();
    return NextResponse.json({ products }, { status: 200 });
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/products/list/GET failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
