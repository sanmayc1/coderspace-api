import { Schema } from 'mongoose';
import { ISkillModel } from '../models/skill.model';

export const skillSchema = new Schema<ISkillModel>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
