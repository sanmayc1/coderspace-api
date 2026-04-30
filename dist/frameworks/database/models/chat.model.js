"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
const mongoose_1 = require("mongoose");
const chat_schema_1 = __importDefault(require("../schema/chat.schema"));
exports.ChatModel = (0, mongoose_1.model)("Chat", chat_schema_1.default);
//# sourceMappingURL=chat.model.js.map