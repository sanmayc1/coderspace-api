import { Schema } from "mongoose";
import { IPlanModel } from "../models/plan.model";


export const planSchema = new Schema<IPlanModel>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    durationInMonths: { type: Number, required: true },
    description: { type: String, required: true },
    features: { type: [String], required: true },

},{
    timestamps:true
});