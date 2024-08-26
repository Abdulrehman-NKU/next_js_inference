import mongoose, { Schema, Types, model } from "mongoose";

export interface IModel {
  _id: string;
  name: string;
  description: string;
  expectedInferenceTime: string;
  acceptFile: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const Model = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    expectedInferenceTime: {
      type: String,
      required: true,
    },
    acceptFile: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Modelm = mongoose.models.Model || model("Model", Model);
export default Modelm;
