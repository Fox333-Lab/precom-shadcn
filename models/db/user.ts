import IUser from "@/types/db/user";
import mongoose, { Schema, model, models } from "mongoose";

const userSchema: Schema = new Schema<IUser>(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    image: {
      type: String,
      default: "",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: "",
    },
    address: [
      {
        _id: {
          type: Schema.Types.ObjectId,
        },
        firstname: {
          type: String,
        },
        lastname: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
        },
        zipcode: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);
const User = models.User || model<IUser>("User", userSchema);
//const User = model<IUser>("User", userSchema);

export default User;
