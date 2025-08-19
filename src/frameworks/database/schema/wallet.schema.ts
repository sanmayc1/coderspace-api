import { Schema } from "mongoose";
import { IWalletModel } from "../models/wallet.model.js";

export const WalletSchema = new Schema<IWalletModel>({
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  contestAmount: {
    type: Number,
    default: 0,
  },
  userType: {
    type: String,
    required: true,
    enum: ["user", "company", "admin"],
  },
});
