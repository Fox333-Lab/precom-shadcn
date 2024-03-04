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
export default interface IUser {
  _id: Types.ObjectId;
  name: String;
  email: String;
  password: String;
  role: String;
  image: String;
  emailVerified: Boolean;
  defaultPaymentMethod: String;
  address: Types.DocumentArray<IAddress>;
}
