import ISubCategory from "@/types/db/subcategory";
import { Schema, model, models } from "mongoose";

const { ObjectId } = Schema;

const subCategorySchema = new Schema<ISubCategory>({
  name: {
    type: String,
    required: true,
    minLength: [2, "must be atleast 2 chars"],
    maxLength: [2, "cannot exceed 32 chars"],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  parent: {
    type: ObjectId,
    ref: "Category",
    required: true,
  },
});

const SubCategory =
  models.SubCategory || model("SubCategory", subCategorySchema);

export default SubCategory;
