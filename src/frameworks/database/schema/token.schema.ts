import { Schema } from "mongoose";
import { ITokenModel } from "../models/token.model.js";

export const tokenSchema = new Schema<ITokenModel>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    deviceId: {
      type: String,
      required: true,
      index: true,
    },
    accountId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    expiry: {
      type: Date,
      required: true,
      index: { expires: 1 },
    },
  },
  { timestamps: true }
);
