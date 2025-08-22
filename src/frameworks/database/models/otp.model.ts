import { model, ObjectId } from "mongoose";
import { IOtpEntity } from "../../../entities/models/otp.entity.js";
import { otpSchema } from "../schema/otp.schema.js";





export interface IOtpModel extends Omit<IOtpEntity , "_id">{
    _id:ObjectId,
    
}

export const OtpModel = model("Otp",otpSchema)