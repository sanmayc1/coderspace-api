import { Schema } from "mongoose";
import { IInterviewModel } from "../models/interview.model";



export const interviewSchema = new Schema<IInterviewModel>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        context: { type: String, required: true },
        numberOfQuestions: { type: Number, required: true },
        difficulty: { type: String, required: true },
        durationInMinutes: { type: Number, required: true },
        isPremium: { type: Boolean, required: true },

    },
    { timestamps: true }
)