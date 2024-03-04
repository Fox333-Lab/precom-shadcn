import ICategory from "@/types/db/category";
import { Schema, model, models } from "mongoose";

//const { ObjectId } = mongoose.Schema;

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, "must be atleast 2 chars"],
      maxLength: [32, "cannot exceed 32 chars"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);
const Category =
  models.Category || model<ICategory>("Category", categorySchema);

export default Category;
