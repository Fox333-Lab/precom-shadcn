import db from "@/lib/db";
import Category from "@/models/db/category";
import Product from "@/models/db/product";
import SubCategory from "@/models/db/subcategory";
import User from "@/models/db/user";
import IProduct from "@/types/db/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string[] } }
) => {
  console.log("In api/products/details request");
  console.log("params : ", params);
  const slug = params.slug[0];
  console.log("params slug : ", slug);
  const style: number = (params.slug[1] || 0) as number;
  console.log("params style : ", style);
  const size: number = (params.slug[2] || 0) as number;
  console.log("params size : ", size);
  try {
    await db.ConnectDB();
    let product: IProduct | null = await Product.findOne({ slug })
      .populate({ path: "category", model: Category })
      .populate({ path: "subCategories", model: SubCategory })
      .populate({ path: "reviews.reviewBy", model: User })
      .lean();
    if (!product) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "products not found" },
        { status: 404 }
      );
    }
    let subProduct = product.subProducts[style];
    if (!subProduct) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "style details not found" },
        { status: 404 }
      );
    }
    let prices = subProduct.sizes
      .map((s) => {
        return s.price;
      })
      .sort((a, b) => {
        return a - b;
      });
    console.log("In api/products/details : prices : ", prices);
    let newProduct = {
      ...product,
      style,
      images: subProduct.images,
      sizes: subProduct.sizes,
      discount: subProduct.discount,
      sku: subProduct.sku,
      colors: product.subProducts.map((p) => {
        return p.color;
      }),
      priceRange:
        prices.length > 1
          ? `From ${prices[0]} to ${prices[prices.length - 1]}$`
          : "",
      price:
        subProduct.discount > 0
          ? (
              subProduct.sizes[size].price -
              subProduct.sizes[size].price / subProduct.discount
            ).toFixed(2)
          : subProduct.sizes[size].price,
      priceBefore: subProduct.sizes[size].price,
      quantity: subProduct.sizes[size].qty,
      ratings: [
        {
          percentage: 76,
        },
        {
          percentage: 14,
        },
        {
          percentage: 6,
        },
        {
          percentage: 4,
        },
        {
          percentage: 0,
        },
      ],
      reviews: product.reviews.reverse(), // added during add review code
      allSizes: product.subProducts
        .map((p) => {
          return p.sizes;
        })
        .flat()
        .sort((a, b) => {
          //return a.size - b.size;
          return a.size > b.size ? 1 : -1;
        })
        .filter(
          (element, index, array) =>
            array.findIndex((e12) => e12.size === element.size) === index
        ),
    };
    if (!newProduct) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "products not found" },
        { status: 404 }
      );
    }
    await db.DisconnectDB();
    return NextResponse.json({ product: newProduct }, { status: 200 });
  } catch (err: any) {
    console.log("catch : api/products/details failed : ", err.message);
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
