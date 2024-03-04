import { Types } from "mongoose";

interface ISubCategory {
  _id: Types.ObjectId;
}
interface IDetail {
  name: String;
  value: String;
  _id: Types.ObjectId;
}
interface IQuestion {
  question: String;
  answer: String;
}
export interface IImage {
  url: String;
  public_url: String;
}
export interface IReview {
  _id: Types.ObjectId;
  reviewBy: Types.ObjectId;
  rating: Number;
  review: String;
  size: String;
  images: Types.ArraySubdocument<IImage>;
  likes: { likes: Number };
  style: IStyle;
  fit: String;
}
export interface IStyle {
  color: String;
  image: String;
}
export interface ISize {
  size: string;
  qty: Number;
  price: number;
}
export interface ISubProduct {
  _id: Types.ObjectId;
  sku: String;
  images: Types.ArraySubdocument<IImage>;
  description_images: Types.ArraySubdocument<IImage>;
  color: IStyle;
  //color: Types.ArraySubdocument<IStyle>;
  //color: IStyle[];
  sizes: Types.DocumentArray<ISize>;
  discount: number;
  sold: Number;
}

export default interface IProduct {
  _id: Types.ObjectId;
  name: String;
  description: String;
  brand: String;
  slug: String;
  category: Types.ObjectId;
  subCategories: Types.DocumentArray<ISubCategory>;
  details: Types.DocumentArray<IDetail>;
  questions: Types.ArraySubdocument<IQuestion>;
  reviews: Types.DocumentArray<IReview>;
  refundPolicy: String;
  rating: Number;
  numberOfReviews: Number;
  shipping: Number;
  subProducts: Types.DocumentArray<ISubProduct>;
}
