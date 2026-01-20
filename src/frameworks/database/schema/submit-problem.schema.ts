import { Schema } from 'mongoose';
import { ISubmitProblemModel } from '../models/submit-problem.model';
import { LANGUAGES, STATUS } from '../../../shared/constant';

export const submitProblemSchema = new Schema<ISubmitProblemModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    problemId: {
      type: Schema.Types.ObjectId,
      ref: 'Problem',
    },
    solution: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: LANGUAGES,
      required: true,
    },
    status: {
      type: String,
      enum: STATUS,
      required: true,
    },
  },
  { timestamps: true }
);
