"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const constant_1 = require("../../../shared/constant");
const subscriptionSchema = new mongoose_1.Schema({
    planId: {
        type: String,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
});
exports.userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    xpCoin: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 0,
    },
    globalScore: {
        type: Number,
        default: 0,
    },
    notification: {
        type: Boolean,
        default: true,
    },
    badge: {
        type: String,
        enum: constant_1.BADGE,
        default: 'silver',
    },
    about: {
        type: String,
    },
    subscription: {
        type: subscriptionSchema,
        default: null,
    },
    isProfileComplete: {
        type: Boolean,
        default: false,
    },
    domain: {
        type: Array,
    },
    skills: {
        type: Array,
    },
    accountId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Account',
    },
    suggestionLevel: {
        type: String,
        enum: constant_1.DIFFICULTY,
    },
}, { timestamps: true });
//# sourceMappingURL=user.schema.js.map