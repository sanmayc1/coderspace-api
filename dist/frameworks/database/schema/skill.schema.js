"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillSchema = void 0;
const mongoose_1 = require("mongoose");
exports.skillSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
}, { timestamps: true });
//# sourceMappingURL=skill.schema.js.map