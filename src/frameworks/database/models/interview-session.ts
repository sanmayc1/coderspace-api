import { model, Types } from "mongoose";
import { IInterviewSessionEntity } from "../../../domain/entities/interview-session";
import { interviewSessionSchema } from "../schema/interview-session.schema";




export interface IInterviewSessionModel extends Document, Omit<IInterviewSessionEntity, '_id'|'accountId'|'interviewId'> {
    _id: Types.ObjectId;
    accountId:Types.ObjectId
    interviewId:Types.ObjectId

}


export const InterviewSessionModel = model<IInterviewSessionModel>('InterviewSession', interviewSessionSchema);