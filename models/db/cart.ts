import ICart from "@/types/db/cart";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema<ICart>(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        name: {
          type: String,
        },
        image: {
          type: String,
        },
        size: {
          type: String,
        },
        // style: {
        //   style: String,
        //   color: String,
        //   image: String,
        // },
        style: {
          type: Number,
        },
        pqty: {
          type: Number,
        },
        color: {
          color: String,
          image: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    shippingFee: Number,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);
const Cart = mongoose.models.Cart || mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
