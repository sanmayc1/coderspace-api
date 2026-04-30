"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountsSchema = void 0;
const mongoose_1 = require("mongoose");
const constant_1 = require("../../../shared/constant");
exports.accountsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    authProvider: {
        type: String,
        enum: constant_1.AUTHPROVIDER,
        default: 'local',
    },
    role: {
        type: String,
        enum: constant_1.ROLES,
        default: 'user',
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    profileUrl: {
        type: String,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
//# sourceMappingURL=account.schema.js.map