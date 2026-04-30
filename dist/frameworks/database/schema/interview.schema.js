"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.interviewSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    context: { type: String, required: true },
    numberOfQuestions: { type: Number, required: true },
    difficulty: { type: String, required: true },
    durationInMinutes: { type: Number, required: true },
    isPremium: { type: Boolean, required: true },
}, { timestamps: true });
//# sourceMappingURL=interview.schema.js.map