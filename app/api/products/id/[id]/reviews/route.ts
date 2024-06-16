import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/lib/db";
import Product from "@/models/db/product";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  console.log("In api/products/id/[id]/reviews PUT");
  try {
    const userSession = await getServerSession(authOptions);
    const userId = userSession?.user.uid;
    const pid = params.id;
    const { size, style, fit, rating, review, images } = await req.json();
    await db.ConnectDB();
    const product = await Product.findById(pid);
    if (!product) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    const reviewExist = await product.reviews.find(
      (x: any) => x.reviewBy === userId
    );
    if (reviewExist) {
      await product.updateOne(
        { _id: pid, "reviews._id": reviewExist._id },
        {
          $set: {
            "reviews.$.size": size,
            "reviews.$.style": style,
            "reviews.$.fit": fit,
            "reviews.$.rating": rating,
            "reviews.$.review": review,
            "reviews.$.images": images,
          },
        },
        {
          new: true,
        }
      );
      const updatedProduct = await Product.findById(pid);
      updatedProduct.numReviews = updatedProduct.reviews.length;
      updatedProduct.rating =
        updatedProduct.reviews.reduce((a: any, c: any) => c.rating + a, 0) /
        updatedProduct.reviews.length;
      await updatedProduct.save();
      await updatedProduct.populate("reviews.reviewBy");
      await db.DisconnectDB();
      return NextResponse.json(
        { reviews: updatedProduct.reviews.reverse() },
        { status: 200 }
      );
    } else {
      const newReview = {
        reviewBy: userId,
        size,
        style,
        fit,
        rating,
        review,
        images,
      };
      product.reviews.push(newReview);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a: any, c: any) => c.rating + a, 0) /
        product.reviews.length;
      await product.save();
      await product.populate("reviews.reviewBy");
      await db.DisconnectDB();
      return NextResponse.json(
        { reviews: product.reviews.reverse() },
        { status: 200 }
      );
    }
  } catch (err: any) {
    console.log("catch : api/products/id/[id]/reviews failed : ", err.message);
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
