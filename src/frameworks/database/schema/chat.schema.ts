import { Schema } from "mongoose";
import { IChatModel } from "../models/chat.model";




const chatSchema = new Schema<IChatModel>({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"Account",
        required:true
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        ref:"Account",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    seen:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

export default chatSchema;