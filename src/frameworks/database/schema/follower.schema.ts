import { Schema } from "mongoose";
import { IFollowerModel } from "../models/follower.model";




export const followerSchema = new Schema<IFollowerModel>({
    followerId:{type:Schema.Types.ObjectId,ref:"User"},
    followeeId:{type:Schema.Types.ObjectId,ref:"User"},
},{timestamps:true})