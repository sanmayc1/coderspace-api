"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    senderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    receiverId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
exports.default = chatSchema;
//# sourceMappingURL=chat.schema.js.map