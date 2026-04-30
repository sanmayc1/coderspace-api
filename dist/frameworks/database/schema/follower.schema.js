"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.followerSchema = new mongoose_1.Schema({
    followerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    followeeId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
//# sourceMappingURL=follower.schema.js.map