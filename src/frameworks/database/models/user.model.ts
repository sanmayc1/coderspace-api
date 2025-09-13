import { model, Document, ObjectId } from "mongoose";
import { IUserEntity } from "../../../entities/models/user.entity.js";
import { userSchema } from "../schema/user.schema.js";


export interface IUserModel
  extends Omit<
      IUserEntity,
      | "_id"
      | "isProfileComplete"
      | "level"
      | "notifiacation"
      | "xpCoin"
      | "badge"
      | "isPremiumActive"
      | "accountId"
      | "globalScore"
    >,
    Document {
  _id: ObjectId;
  accountId: ObjectId;
  isProfileComplete: boolean;
  level: number;
  notification: boolean;
  xpCoin: number;
  badge: "silver" | "gold" | "platinum";
  isPremiumActive: boolean;
  globalScore:number

}

export const UserModel = model<IUserModel>("User", userSchema);
