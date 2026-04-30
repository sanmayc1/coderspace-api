"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentSchema = void 0;
const mongoose_1 = require("mongoose");
const constant_1 = require("../../../shared/constant");
exports.paymentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    planId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Plan",
        required: true
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    razorpayPaymentId: {
        type: String,
        default: null
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: "INR"
    },
    status: {
        type: String,
        required: true,
        enum: constant_1.PAYMENT_STATUS_ENUM,
        default: "pending"
    }
}, { timestamps: true });
//# sourceMappingURL=payment.schema.js.map