import { Types } from "mongoose";
import { IImage, IStyle } from "../db/product";

export interface ITempProduct {
  product: Types.ObjectId | undefined;
  name: string;
  image: string;
  images: IImage[];
  size: string;
  style: number;
  pqty: number;
  color: IStyle;
  price: number;
  _uid: string;
  quantity: number;
  _id: Types.ObjectId;
}
