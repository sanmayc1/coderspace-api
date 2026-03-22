import { Schema } from 'mongoose';
import { IInterviewQuestionsModel } from '../models/interview-questions.model';

export const interviewQuestionsSchema = new Schema<IInterviewQuestionsModel>(
  {
    sessionId: { type: Schema.Types.ObjectId, ref: 'InterviewSession' },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    attempted: { type: Boolean, required: true },
    feedback: { type: String, required: true },
    score: { type: Number, required: true },
  },
  { timestamps: true }
);


