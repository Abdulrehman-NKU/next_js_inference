import mongoose, { Schema, model, Types } from "mongoose";
import { IUser } from "./User";
import { IModel } from "./Model";

export interface Iinferance<U = string, M = string> {
  _id: string;
  status: string;
  total_infer_time: number;
  elapsed_time: number;
  attachment: string;
  user: U;
  model: M;
}

const Inference = new Schema<Iinferance<IUser, IModel>>(
  {
    status: {
      type: String,
      required: true,
    },
    total_infer_time: {
      type: Number,
      required: true,
    },
    elapsed_time: {
      type: Number,
      default: 0,
    },
    attachment: {
      type: String,
      default: "",
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    model: {
      type: Types.ObjectId,
      ref: "Model",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.models.Inference || model("Inference", Inference);

export default Model;
