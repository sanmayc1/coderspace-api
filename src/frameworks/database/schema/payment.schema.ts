import { Schema } from "mongoose";
import { IPaymentModel } from "../models/payment.model";
import { PAYMENT_STATUS_ENUM } from "../../../shared/constant";





export const paymentSchema = new Schema<IPaymentModel>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"Account",
        required:true
    },
    planId:{
        type:Schema.Types.ObjectId,
        ref:"Plan",
        required:true
    },
    razorpayOrderId:{
        type:String,
        required:true
    },
    razorpayPaymentId:{
        type:String,
        default:null
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true,
        default:"INR"
    },
    status:{
        type:String,
        required:true,
        enum:PAYMENT_STATUS_ENUM,
        default:"pending"
    }
},{timestamps:true})