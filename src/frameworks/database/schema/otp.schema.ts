import { Schema } from "mongoose";
import { IOtpModel } from "../models/otp.model.js";

export const otpSchema = new Schema<IOtpModel>({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
    index:{expires:1}
  }
  
});
