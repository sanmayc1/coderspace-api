"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planSchema = void 0;
const mongoose_1 = require("mongoose");
exports.planSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    durationInMonths: { type: Number, required: true },
    description: { type: String, required: true },
    features: { type: [String], required: true },
}, {
    timestamps: true
});
//# sourceMappingURL=plan.schema.js.map