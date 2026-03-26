import { Schema } from "mongoose";
import { IInterviewSessionModel } from "../models/interview-session";
import { INTERVIEW_STATUS } from "../../../shared/constant";





export const interviewSessionSchema = new Schema<IInterviewSessionModel>(
    {
        accountId: { type: Schema.Types.ObjectId, ref: 'Account',required:true },
        interviewId: { type: Schema.Types.ObjectId, ref: 'Interview',required:true },
        status: { type: String, enum:INTERVIEW_STATUS,default:"ongoing"},
        startedAt: { type: Date, required: true },
        completedAt: { type: Date, required:true},
        finalScore: { type: Number, default:0},
        overallFeedback: { type: String, default:""},
    },
    { timestamps: true }
)

