"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interviewSessionSchema = void 0;
const mongoose_1 = require("mongoose");
const constant_1 = require("../../../shared/constant");
exports.interviewSessionSchema = new mongoose_1.Schema({
    accountId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Account', required: true },
    interviewId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Interview', required: true },
    status: { type: String, enum: constant_1.INTERVIEW_STATUS, default: "ongoing" },
    startedAt: { type: Date, required: true },
    completedAt: { type: Date, required: true },
    finalScore: { type: Number, default: 0 },
    overallFeedback: { type: String, default: "" },
}, { timestamps: true });
//# sourceMappingURL=interview-session.schema.js.map