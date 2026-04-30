"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.notificationSchema = new mongoose_1.Schema({
    accountId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    type: {
        type: String
    },
    link: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
//# sourceMappingURL=notification.schema.js.map