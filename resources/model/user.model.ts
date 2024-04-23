import mongoose, { Schema, Model } from "mongoose";
import user from "../interface/user.interface";

// declare userSchema with interface product
const userSchema = new Schema<user>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passWord: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
