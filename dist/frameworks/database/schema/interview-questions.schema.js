"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interviewQuestionsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.interviewQuestionsSchema = new mongoose_1.Schema({
    sessionId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'InterviewSession' },
    question: { type: String, required: true },
    answer: { type: String, default: '' },
    attempted: { type: Boolean, default: false },
    feedback: { type: String, default: '' },
    score: { type: Number, default: 0 },
    order: { type: Number, required: true },
}, { timestamps: true });
//# sourceMappingURL=interview-questions.schema.js.map