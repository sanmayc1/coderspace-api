import { Schema, Types } from "mongoose";
import { IProblemModel } from "../models/problem.model.js";
import { DIFFICULTY, VIEW } from "../../../shared/constant.js";
import { IExample } from "../../../domain/entities/problem-entity.js";
import { string } from "zod";

const exampleSchema = new Schema<IExample>({
  explanation: {
    type: String,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

export const problemSchema = new Schema<IProblemModel>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: DIFFICULTY,
    required: true,
  },
  constraints: {
    type: String,
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
  examples: [exampleSchema],
  isPremium:{
    type:Boolean,
    default:false
  },
  view:{
    type:String,
    enum:VIEW,
    default:"private"
  },
});
