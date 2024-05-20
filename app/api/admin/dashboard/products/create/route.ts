import db from "@/lib/db";
import Product from "@/models/db/product";
import { ISubProduct } from "@/types/db/product";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export const POST = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/products/create POST");
  try {
    // const { parent } = await req.json();
    const product = await req.json();
    const parent = product?.parent;
    console.log("product : ", product);
    console.log("parent 1 : ", parent);
    await db.ConnectDB();

    if (parent) {
      const parentProduct = await Product.findById(parent);
      if (!parentProduct) {
        console.log("no parent product");
        return NextResponse.json(
          { message: "Parent product not found" },
          { status: 400 }
        );
      } else {
        console.log("parent product : ", parentProduct);
        console.log("product.images : ", product.images);
        const newSubProduct: ISubProduct = {
          _id: new mongoose.Types.ObjectId(),
          sku: product.sku,
          images: product.images,
          color: product.color,
          sizes: product.sizes,
          discount: product.discount,
          sold: 0,
          description_images: product.description_images,
        };
        parentProduct.subProducts.push(newSubProduct);
        parentProduct.name = product.name;
        parentProduct.description = product.description;
        parentProduct.brand = product.brand;
        parentProduct.details = product.details;
        parentProduct.questions = product.questions;
        parentProduct.category = product.category;
        parentProduct.subCategories = product.subCategories;
        await parentProduct.save();
      }
    } else {
      console.log("Creating nw product");
      const newProduct = new Product({
        name: product.name,
        description: product.description,
        brand: product.brand,
        details: product.details,
        questions: product.questions,
        slug: slugify(product.name.toLowerCase()),
        category: product.category,
        subCategories: product.subCategories,
        subProducts: [
          {
            _id: new mongoose.Types.ObjectId(),
            sku: product.sku,
            images: product.images,
            color: product.color,
            sizes: product.sizes,
            discount: product.discount,
            sold: 0,
            description_images: product.description_images,
          },
        ],
      });
      await newProduct.save();
      console.log("product created");
    }

    await db.DisconnectDB();
    console.log("api/admin/dashboard/products/create POST disconnected");
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/products/create POST failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
