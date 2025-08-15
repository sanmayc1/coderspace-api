import { model,Document,ObjectId } from "mongoose";
import { IUserEntity } from "../../../entities/models/user.entity.js";
import { UserSchema } from "../schema/user.schema.js";

export interface IUserModel extends Omit<IUserEntity , "_id">,Document{
    _id:ObjectId
}

export const userModel = model<IUserModel>("User",UserSchema)
