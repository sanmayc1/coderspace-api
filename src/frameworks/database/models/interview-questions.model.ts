import { model, Types } from "mongoose";
import { IInterviewQuestionsEntity } from "../../../domain/entities/interview-questions";
import { interviewQuestionsSchema } from "../schema/interview-questions.schema";





export interface IInterviewQuestionsModel
  extends Document, Omit<IInterviewQuestionsEntity, '_id'|"sessionId"> {
    _id: Types.ObjectId;
    sessionId:Types.ObjectId;
  }

  


export const InterviewQuestionsModel = model<IInterviewQuestionsModel>('InterviewQuestions', interviewQuestionsSchema);