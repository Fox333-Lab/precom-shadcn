import db from "@/lib/db";
import Product from "@/models/db/product";
import IProduct from "@/types/db/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const pid = params.id;
  const searchParams = req.nextUrl.searchParams;
  const style: number = (searchParams.get("style") || 0) as number;
  const size = (searchParams.get("size") || 0) as number;
  try {
    db.ConnectDB();
    const product: IProduct | null = await Product.findById(pid).lean();
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

    db.DisconnectDB();
    return NextResponse.json({
      _id: product._id,
      style: Number(style),
      name: product.name,
      description: product.description,
      slug: product.slug,
      sku: product.subProducts[style].sku,
      brand: product.brand,
      shipping: product.shipping,
      images: product.subProducts[style].images,
      color: product.subProducts[style].color,
      size: product.subProducts[style].sizes[size].size,
      price: Number(price),
      priceBefore: Number(priceBefore),
      quantity: product.subProducts[style].sizes[size].qty,
    });
  } catch (err: any) {
    console.log("catch : api/products/id failed : ", err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
