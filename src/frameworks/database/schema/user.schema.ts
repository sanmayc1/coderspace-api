import { Schema } from "mongoose";
import { IUserModel } from "../models/user.model.js";
import { BADGE, DIFFICULTY } from "../../../shared/constant.js";

export const userSchema = new Schema<IUserModel>(
  {
    phone: {
      type: String
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    xpCoin: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    githubUrl: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },
    globalScore: {
      type: Number,
      default: 0,
    },
    notification: {
      type: Boolean,
      default: true,
    },
    badge: {
      type: String,
      enum: BADGE ,
      default: "silver",
    },
    about: {
      type: String,
    },
    isPremiumActive: {
      type: Boolean,
      default: false,
    },
    planHistory: {
      type: Array,
      default: [],
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    domain: {
      type: Array,
    },
    skills: {
      type: Array,
    },
    accountId:{
      type:Schema.Types.ObjectId,
      ref:"Account"
    },
    suggestionLevel:{
      type:String,
      enum:DIFFICULTY
    }
  },
  { timestamps: true }
);
