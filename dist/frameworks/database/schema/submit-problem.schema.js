"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitProblemSchema = void 0;
const mongoose_1 = require("mongoose");
const constant_1 = require("../../../shared/constant");
exports.submitProblemSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    problemId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Problem',
    },
    solution: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        enum: constant_1.LANGUAGES,
        required: true,
    },
    status: {
        type: String,
        enum: constant_1.STATUS,
        required: true,
    },
}, { timestamps: true });
//# sourceMappingURL=submit-problem.schema.js.map