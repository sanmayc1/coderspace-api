import { Schema } from "mongoose";
import { IUserModel } from "../models/user.model.js";
import { ROLES } from "../../../shared/constant.js";

export const UserSchema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
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
    profileUrl: {
      type: String,
    },
    role: {
      enum: ROLES,
      required: true,
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
      enum: ["silver", "gold", "platinum"],
      default: "silver",
    },
    authProvider: {
      type: String,
      enum: ["google", "github", "local"],
      default: "local",
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
      default: true,
    },
    position: {
      type: String,
    },
    experience: {
      type: Number,
    },
    domain: {
      type: Array,
    },
    skills: {
      type: Array,
    },
    profession: {
      type: String,
    },
  },
  { timestamps: true }
);
