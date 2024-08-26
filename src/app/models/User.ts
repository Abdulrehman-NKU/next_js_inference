import mongoose, { Schema, model } from "mongoose";

export interface IUser<U = string> {
  _id: string;
  isAdmin: boolean;
  userName: string;
  inference: U;
  createdAt: Date;
  updatedAt: Date;
}

const User = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.models.User || model("User", User);

export default Model;
