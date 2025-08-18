import { ObjectId } from "mongoose";

export interface IWalletEnitity {
  _id?: string | ObjectId;
  userId: string | ObjectId;
  balance: number;
  contestAmount: number;
  userType:"user"|"company"|"admin"
  createdAt:Date
  updatedAt:Date

}
