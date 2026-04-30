"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contestSchema = void 0;
const mongoose_1 = require("mongoose");
const constant_1 = require("../../../shared/constant");
const rewardSchema = new mongoose_1.Schema({
    rank: {
        type: Number,
        required: true,
        min: 1,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
}, { _id: false });
exports.contestSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
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
    problemsIds: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Problem',
            required: true,
        },
    ],
    rewards: {
        type: [rewardSchema],
        default: [],
    },
    dateAndTime: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
    },
    view: {
        type: String,
        enum: constant_1.VIEW,
        default: 'private',
    },
    creatorId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    endDateAndTime: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
//# sourceMappingURL=contest.schema.js.map