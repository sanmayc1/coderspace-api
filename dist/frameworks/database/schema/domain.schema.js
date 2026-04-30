"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domainSchema = void 0;
const mongoose_1 = require("mongoose");
exports.domainSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
}, { timestamps: true });
//# sourceMappingURL=domain.schema.js.map