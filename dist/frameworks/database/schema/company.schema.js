"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companySchema = void 0;
const mongoose_1 = require("mongoose");
exports.companySchema = new mongoose_1.Schema({
    gstin: {
        type: String,
        required: true,
    },
    accountId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Account',
    },
}, { timestamps: true });
//# sourceMappingURL=company.schema.js.map