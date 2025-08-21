import { model, Document, ObjectId } from "mongoose";
import { IUserEntity } from "../../../entities/models/user.entity.js";
import { userSchema } from "../schema/user.schema.js";
import { TRole } from "../../../shared/constant.js";

export interface IUserModel
  extends Omit<IUserEntity, "_id" | "role"|"isProfileComplete"|"password"|"isVerified"|"level"|"notifiacation"|"xpCoin"|"authProvider"|"badge"|"isPremiumActive">,
    Document {
  _id: ObjectId;
  role: TRole;
  isProfileComplete: boolean;
  password: string;
  isVerified: boolean;
  level: number;
  notification: boolean;
  xpCoin: number;
  authProvider:"google" | "github" | "local",
  badge:"silver" | "gold" | "platinum",
  isPremiumActive:boolean
  
}

export const UserModel = model<IUserModel>("User", userSchema);
