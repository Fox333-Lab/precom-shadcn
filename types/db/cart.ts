import { Types } from "mongoose";
import { IImage, IStyle } from "./product";

export interface ICartProduct {
  _id: Types.ObjectId;
  name: String;
  image: String;
  images: IImage[];
  size: String;
  style: number;
  pqty: number;
  color: IStyle;
  price: number;
  _uid: string;
  quantity: number;
}

export default interface ICart {
  products: Types.ArraySubdocument<ICartProduct>;
  cartTotal: Number;
  totalAfterDiscount: Number;
  user: {
    type: Types.ObjectId;
  };
}
