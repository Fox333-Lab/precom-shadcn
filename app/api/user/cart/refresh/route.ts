import { db } from "@/lib";
import Product from "@/models/db/product";
import IProduct, { ISize } from "@/types/db/product";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    console.log("in api/user/cart request");
    db.ConnectDB();
    const { products } = await req.json();
    let cartItemsState = products;
    console.log(
      "in api/user/cart products before : ",
      cartItemsState,
      " / length : ",
      cartItemsState.length
    );
    // if (userId) {
    //   console.log("in api/user/cart products user : ", userId);
    //   let cartProducts = await Cart.findOne({ user: userId });
    //   if (cartProducts) {
    //     cartItemsState = cartProducts.products;
    //   }
    // }
    console.log("in api/user/cart products after : ", cartItemsState);
    const promises = cartItemsState.map(async (p: any) => {
      // let pid = (cartItemsState.length <= 0 ? p.product : p._id).toString();
      // console.log("p pid : ", pid);
      let pid: string = p._id.toString();
      let dbProduct: IProduct | null = await Product.findById(
        p._id.toString()
      ).lean();
      // console.log("p dbProduct: ", dbProduct);

      if (!dbProduct) {
        return NextResponse.json(
          { message: "products not found" },
          { status: 404 }
        );
      }
      let ogPrice =
        dbProduct?.subProducts[p.style].sizes.find(
          (s: ISize) => s.size == p.size
        )?.price || 0;
      let quantity =
        dbProduct?.subProducts[p.style].sizes.find(
          (s: ISize) => s.size == p.size
        )?.qty || 0;
      let discount = dbProduct?.subProducts[p.style].discount || 0;
      return {
        ...p,
        priceBefore: ogPrice,
        price:
          discount > 0
            ? (ogPrice - ogPrice / discount).toFixed(2)
            : ogPrice.toFixed(2),
        discount: discount,
        quantity: quantity,
        shipping: dbProduct?.shipping.toFixed(2),
      };
    });

    // const product = await Product.findById(pid).lean();
    // let discount = product.subProducts[style].discount;
    // let priceBefore = product.subProducts[style].sizes[size].price;
    // let price =
    //   discount > 0
    //     ? (priceBefore - priceBefore / discount).toFixed(2)
    //     : priceBefore;
    const data = await Promise.all(promises);
    db.DisconnectDB();
    console.log("in api/user/cart/refresh data : ", data);
    // return NextResponse.json({
    //   _id: product._id,
    //   style: Number(style),
    //   name: product.name,
    //   description: product.description,
    //   slug: product.slug,
    //   sku: product.subProducts[style].sku,
    //   brand: product.brand,
    //   shipping: product.shipping,
    //   images: product.subProducts[style].images,
    //   colors: product.subProducts[style].color,
    //   size: product.subProducts[style].sizes[size].size,
    //   price: Number(price),
    //   priceBefore: Number(priceBefore),
    //   quantity: product.subProducts[style].sizes[size].qty,
    // });
    return NextResponse.json(data);
  } catch (err: any) {
    console.log("catch : api/user/cart failed : ", err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
