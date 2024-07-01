import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/lib/db";
import Cart from "@/models/db/cart";
import Product from "@/models/db/product";
import User from "@/models/db/user";
import { ICartProduct } from "@/types/db/cart";
import IProduct, { IImage } from "@/types/db/product";
import { ITempProduct } from "@/types/misc/tempproduct";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const userSession = await getServerSession(authOptions);
  try {
    const userId = userSession?.user.uid;
    console.log("in add to cart post request");
    await db.ConnectDB();
    console.log("in add to cart : after connectdb");
    const { cart, shippingFee }: { cart: ICartProduct[]; shippingFee: number } =
      await req.json();
    console.log("in add to cart post request : ", cart);
    console.log("in add to cart post request : ", shippingFee);
    let products: ICartProduct[] = [];
    let user = await User.findById(userId);
    console.log("in add to cart post request : user : ", user);
    //let existing_cart = await Cart.findOne({ user: userId });
    let existing_cart = await Cart.deleteOne({ user: userId });
    // if(existing_cart){
    //     await existing_cart.re
    // }
    console.log(
      "in add to cart post request : starting for loop : cart.length : ",
      cart.length,
      " / deleted : ",
      existing_cart,
    );
    for (let i = 0; i < cart.length; i++) {
      let dbProduct: IProduct | null = await Product.findById(
        cart[i]._id,
      ).lean();
      console.log("in add to cart post request found dbProduct : ");
      if (!dbProduct) {
        continue;
      }
      let subProduct = dbProduct.subProducts[cart[i].style];
      console.log("in add to cart post request found subproduct : ");
      let tempProduct: ITempProduct = <ITempProduct>{};
      console.log("in add to cart post request : blank temp created");
      tempProduct.name = dbProduct.name.toString();
      tempProduct.product = dbProduct._id;
      tempProduct.color = {
        color: cart[i].color.color,
        image: cart[i].color.image,
      };
      console.log(
        "in add to cart post request : before image / cart[i].pqty",
        cart[i].pqty,
      );
      console.log(
        "in add to cart post request : before image / cart[i].style",
        cart[i].style,
      );

      tempProduct.images = subProduct.images as unknown as IImage[];
      tempProduct.image = tempProduct.images[0].url.toString();
      tempProduct.pqty = Number(cart[i].pqty);
      tempProduct.style = Number(cart[i].style);
      tempProduct.size = cart[i].size.toString();
      console.log("in add to cart post request : before price");
      let price = Number(
        subProduct?.sizes.find((p) => p.size == cart[i].size)?.price,
      );
      console.log("in add to cart post request : before temp price");
      tempProduct.price = Number(
        subProduct?.discount > 0
          ? (price - price / Number(subProduct?.discount)).toFixed(2)
          : price.toFixed(2),
      );
      console.log(
        "in add to cart post request: pushing tempProduct : ",
        tempProduct,
      );
      products.push(tempProduct);
      console.log("in add to cart post request: pushing products : ", products);
    }
    console.log("in add to cart post request : after for loop");
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].pqty;
    }
    await new Cart({
      products,
      cartTotal: cartTotal.toFixed(2),
      shippingFee: shippingFee,
      user: user._id,
    }).save();
    console.log("saved");
    await db.DisconnectDB();
    return new NextResponse(
      JSON.stringify({ message: "success", isAddedToCart: true }),
      {
        status: 200,
      },
    );
  } catch (err: any) {
    await db.DisconnectDB();
    return new NextResponse(
      JSON.stringify({ message: err.message, isAddedToCart: false }),
      {
        status: 500,
      },
    );
  }
};
