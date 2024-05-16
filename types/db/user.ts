import { Types } from "mongoose";

export interface IAddress {
  _id: Types.ObjectId;
  firstname: String;
  lastname: String;
  phoneNumber: String;
  address1: String;
  address2: String;
  city: String;
  zipcode: Number;
  state: String;
  country: String;
  active: Boolean;
}
export interface IWishlist {
  product: Types.ObjectId;
  style: String;
}

export type TUser = IUser & {
  createdAt: string;
  actions: string;
};

export default interface IUser {
  _id: Types.ObjectId;
  name: String;
  email: String;
  password: String;
  role: String;
  image: String;
  emailVerified: Boolean;
  defaultPaymentMethod: String;
  active: Boolean;
  address: Types.DocumentArray<IAddress>;
  // wishlist: Types.DocumentArray<IWishlist>;
}
