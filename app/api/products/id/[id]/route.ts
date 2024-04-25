import db from "@/lib/db";
import Product from "@/models/db/product";
import SubCategory from "@/models/db/subcategory";
import IProduct from "@/types/db/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const pid = params.id;
  const searchParams = req.nextUrl.searchParams;
  const style: number = (searchParams.get("style") || 0) as number;
  const size: number = (searchParams.get("size") || 0) as number;
  try {
    console.log("id : ", pid);
    await db.ConnectDB();
    const product: IProduct | null = await Product.findById(pid)
      .populate({ path: "subCategories", model: SubCategory }) // added during admin create product code
      .lean();
    console.log("product : ", product);
    if (!product) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "products not found" },
        { status: 404 }
      );
    }
    let discount = product?.subProducts[style].discount || 0;
    let priceBefore = product?.subProducts[style].sizes[size].price || 0;
    let price =
      discount > 0
        ? (priceBefore - priceBefore / discount).toFixed(2)
        : priceBefore;

    await db.DisconnectDB();
    return NextResponse.json({
      _id: product._id,
      style: Number(style),
      name: product.name,
      description: product.description,
      slug: product.slug,
      sku: product.subProducts[style].sku,
      brand: product.brand,
      shipping: product.shipping,
      category: product.category, // added during admin create product code
      subCategories: product.subCategories, // added during admin create product code
      images: product.subProducts[style].images,
      color: product.subProducts[style].color,
      size: product.subProducts[style].sizes[size].size,
      price: Number(price),
      priceBefore: Number(priceBefore),
      quantity: product.subProducts[style].sizes[size].qty,
    });
  } catch (err: any) {
    console.log("catch : api/products/id failed : ", err.message);
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
