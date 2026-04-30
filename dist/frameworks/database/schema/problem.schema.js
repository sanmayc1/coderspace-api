"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.problemSchema = void 0;
const mongoose_1 = require("mongoose");
const constant_1 = require("../../../shared/constant");
const exampleSchema = new mongoose_1.Schema({
    explanation: {
        type: String,
        required: true,
    },
    input: {
        type: String,
        required: true,
    },
    output: {
        type: String,
        required: true,
    },
});
exports.problemSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: constant_1.DIFFICULTY,
        required: true,
    },
    constraints: {
        type: String,
    },
    domainId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Domain',
        required: true,
    },
    skillsIds: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Skill',
            required: true,
        },
    ],
    examples: [exampleSchema],
    isPremium: {
        type: Boolean,
        default: false,
    },
    view: {
        type: String,
        enum: constant_1.VIEW,
        default: 'private',
    },
    addedLanguagesId: [{ type: mongoose_1.Types.ObjectId, ref: 'Language', default: [] }],
    problemNumber: {
        type: Number,
        required: true,
    },
    validatorType: {
        type: String,
        enum: constant_1.VALIDATOR_TYPE,
        required: true,
        default: 'exactMatch',
    },
}, { timestamps: true });
//# sourceMappingURL=problem.schema.js.map