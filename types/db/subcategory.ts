import { Types } from "mongoose";

export default interface ISubCategory {
  _id: Types.ObjectId;
  name: String;
  slug: String;
  parent: Types.ObjectId;
}
