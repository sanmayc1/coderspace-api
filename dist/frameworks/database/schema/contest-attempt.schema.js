"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contestAttemptSchema = void 0;
const mongoose_1 = require("mongoose");
exports.contestAttemptSchema = new mongoose_1.Schema({
    contestId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Contest',
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    totalProblems: {
        type: Number,
        default: 0,
    },
    solvedProblems: {
        type: Number,
        default: 0,
    },
    totalSubmissions: {
        type: Number,
        default: 0,
    },
    startDateAndTime: {
        type: Date,
    },
    endDateAndTime: {
        type: Date,
    },
});
//# sourceMappingURL=contest-attempt.schema.js.map