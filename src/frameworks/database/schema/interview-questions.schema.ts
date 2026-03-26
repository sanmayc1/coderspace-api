import { Schema } from 'mongoose';
import { IInterviewQuestionsModel } from '../models/interview-questions.model';

export const interviewQuestionsSchema = new Schema<IInterviewQuestionsModel>(
  {
    sessionId: { type: Schema.Types.ObjectId, ref: 'InterviewSession' },
    question: { type: String, required: true },
    answer: { type: String, default: '' },
    attempted: { type: Boolean, default: false },
    feedback: { type: String, default: '' },
    score: { type: Number, default: 0 },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);


