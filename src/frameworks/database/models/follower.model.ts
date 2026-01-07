import { Document, model, ObjectId, Types } from "mongoose";
import { IFollowerEntity } from "../../../domain/entities/follower-entity";
import { followerSchema } from "../schema/follower.schema";




export interface IFollowerModel extends Omit<IFollowerEntity,"_id"|"followeeId"|"followerId"> ,Document{
    _id:Types.ObjectId,
    followerId:Types.ObjectId,
    followeeId:Types.ObjectId
}



export const FollowerModel = model('Follower',followerSchema)