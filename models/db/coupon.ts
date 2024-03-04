import ICategory from "@/types/db/category";
import ICoupon from "@/types/db/coupon";
import { Schema, model, models } from "mongoose";

//const { ObjectId } = mongoose.Schema;

const couponSchema = new Schema<ICoupon>(
  {
    coupon: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      uppercase: true,
      minLength: 4,
      maxLength: 10,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Coupon = models.Coupon || model<ICoupon>("Coupon", couponSchema);

export default Coupon;
