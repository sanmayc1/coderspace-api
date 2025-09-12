import { Schema } from "mongoose";
import { AUTHPROVIDER, ROLES } from "../../../shared/constant.js";
import { IAccountsModel } from "../models/account.model .js";

export const accountsSchema = new Schema<IAccountsModel>({
  name: {
    type: String,
    required: true,
  },
  authProvider: {
    type: String,
    enum: AUTHPROVIDER,
    default: "local",
  },
  role: {
    type: String,
    enum: ROLES,
    default: "user",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  profileUrl: {
    type: String,
  },
});
