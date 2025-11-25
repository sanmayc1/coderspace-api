import { Schema, Types } from "mongoose";
import { ITestcaseModel } from "../models/testcase.model.js";




export const testcaseSchema = new Schema<ITestcaseModel>({
    input: {
        type: String,
        required: true,
    },
    output: {
        type: String,
        required: true,
    },
    problemId: {
        type: Types.ObjectId,
        ref: "Problem",
    },
    example:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true})