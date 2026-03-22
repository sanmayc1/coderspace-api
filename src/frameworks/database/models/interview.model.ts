import { Document, model, Types } from "mongoose";
import { IInterviewEntity } from "../../../domain/entities/interview-entity";
import { interviewSchema } from "../schema/interview.schema";


export interface IInterviewModel
  extends Document, Omit<IInterviewEntity, '_id'> {
    _id: Types.ObjectId;
  }



export const InterviewModel = model<IInterviewModel>('Interview', interviewSchema);