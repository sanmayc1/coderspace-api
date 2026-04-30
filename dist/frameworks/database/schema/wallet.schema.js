"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletSchema = void 0;
const mongoose_1 = require("mongoose");
exports.walletSchema = new mongoose_1.Schema({
    accountId: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Account',
        index: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    contestAmount: {
        type: Number,
        default: 0,
    },
});
//# sourceMappingURL=wallet.schema.js.map