"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.langaugeSchema = void 0;
const mongoose_1 = require("mongoose");
const constant_1 = require("../../../shared/constant");
exports.langaugeSchema = new mongoose_1.Schema({
    language: {
        type: String,
        enum: constant_1.LANGUAGES,
    },
    solution: {
        type: String,
        default: '',
    },
    templateCode: {
        type: String,
        default: '',
    },
    functionName: {
        type: String,
        default: '',
    },
}, { timestamps: true });
//# sourceMappingURL=language.schema.js.map