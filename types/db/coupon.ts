import { Types } from "mongoose";

export default interface ICoupon {
  _id: Types.ObjectId;
  coupon: String;
  startDate: String;
  endDate: String;
  discount: Number;
}
