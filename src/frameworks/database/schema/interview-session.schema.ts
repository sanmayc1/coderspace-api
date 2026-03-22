import { Schema } from "mongoose";
import { IInterviewSessionModel } from "../models/interview-session";
import { INTERVIEW_STATUS } from "../../../shared/constant";





export const interviewSessionSchema = new Schema<IInterviewSessionModel>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        interviewId: { type: Schema.Types.ObjectId, ref: 'Interview' },
        status: { type: String, required: true ,enum:INTERVIEW_STATUS},
        startedAt: { type: Date, required: true },
        completedAt: { type: Date, required: true },
        finalScore: { type: Number, required: true },
        overallFeedback: { type: String, required: true },
    },
    { timestamps: true }
)

