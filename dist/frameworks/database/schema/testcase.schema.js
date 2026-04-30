"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testcaseSchema = void 0;
const mongoose_1 = require("mongoose");
exports.testcaseSchema = new mongoose_1.Schema({
    input: {
        type: String,
        required: true,
    },
    output: {
        type: String,
        required: true,
    },
    problemId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Problem',
    },
    example: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
//# sourceMappingURL=testcase.schema.js.map