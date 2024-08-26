import connectDB from "@/app/lib/mongodbConnect";
import MongooseModels from "@/app/models";
import { IModel } from "@/app/models/Model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const models = await MongooseModels.Model.find();
    return NextResponse.json(models, {
      status: 200,
    });
  } catch (error) {
    console.log(error, "Error at Get User");
    return NextResponse.json("Failed to Get User", {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body: IModel = await req.json();
    const model = await MongooseModels.Model.findByIdAndUpdate(body._id, body);
    return NextResponse.json(model, {
      status: 200,
    });
  } catch (error) {
    console.log(error, "Error at Put Model");
    return NextResponse.json("Failed to update model", {
      status: 500,
    });
  }
}
