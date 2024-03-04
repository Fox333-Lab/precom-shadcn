import { Types } from "mongoose";
import { IStyle } from "./product";

export interface IOrderProduct {
  product: Types.ObjectId;
  name: String;
  image: String;
  size: String;
  qty: Number;
  color: IStyle;
  price: Number;
}

export interface IShippingAddress {
  _id: Types.ObjectId;
  firstname: String;
  lastname: String;
  phoneNumber: String;
  address1: String;
  address2: String;
  city: String;
  state: String;
  zipcode: String;
  country: String;
}

export interface IPaymentResult {
  id: String;
  status: String;
  email: String;
}

export default interface IOrder {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  products: Types.ArraySubdocument<IOrderProduct>;
  shippingAddress: IShippingAddress;
  paymentMethod: String;
  paymentResult: IPaymentResult;
  total: Number;
  totalBeforeDiscount: Number;
  couponApplied: String;
  shippingPrice: Number;
  taxPrice: Number;
  isPaid: Boolean;
  status: String;
  paidAt: Date;
  deliveredAt: Date;
}
