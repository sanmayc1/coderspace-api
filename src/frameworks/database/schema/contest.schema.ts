import { Schema, Types } from "mongoose";
import { IContestModel } from "../models/contest.model.js";
import { VIEW } from "../../../shared/constant.js";

const rewardSchema = new Schema(
  {
    rank: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

export const contestSchema = new Schema<IContestModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    domainId: {
      type: Types.ObjectId,
      ref: "Domain",
      required: true,
    },
    skillsIds: [
      {
        type: Types.ObjectId,
        ref: "Skill",
        required: true,
      },
    ],
    problemsIds: [
      {
        type: Types.ObjectId,
        ref: "Problem",
        required: true,
      },
    ],
    rewards: {
      type: [rewardSchema],
      default: [],
    },
    dateAndTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    view: {
      type: String,
      enum: VIEW,
      default: "private",
    },
    creatorId: {
      type: Types.ObjectId,
      ref: "Account",
      required: true,
    },
  },
  { timestamps: true }
);

