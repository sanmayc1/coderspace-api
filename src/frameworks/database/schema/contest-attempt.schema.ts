import { Schema } from 'mongoose';
import { IContestAttemptModel } from '../models/contest-attempt.model';

export const contestAttemptSchema = new Schema<IContestAttemptModel>({
  contestId: {
    type: Schema.Types.ObjectId,
    ref: 'Contest',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  totalProblems: {
    type: Number,
    default: 0,
  },
  solvedProblems: {
    type: Number,
    default: 0,
  },
  totalSubmissions: {
    type: Number,
    default: 0,
  },
  startDateAndTime: {
    type: Date,
  },
  endDateAndTime: {
    type: Date,
  },
});
