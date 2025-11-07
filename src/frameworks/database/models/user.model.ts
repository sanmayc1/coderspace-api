import { model, Document, Types } from "mongoose";
import { IUserEntity } from "../../../domain/entities/user.entity.js";
import { userSchema } from "../schema/user.schema.js";
import { IAccountsEntity } from "../../../domain/entities/accounts-entity.js";


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
  _id: Types.ObjectId;
  accountId: Types.ObjectId |IAccountsEntity;
  isProfileComplete: boolean;
  level: number;
  notification: boolean;
  xpCoin: number;
  badge: "silver" | "gold" | "platinum";
  isPremiumActive: boolean;
  globalScore:number

}

export const UserModel = model<IUserModel>("User", userSchema);
