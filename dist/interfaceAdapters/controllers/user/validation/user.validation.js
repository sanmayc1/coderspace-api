"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileUpdateSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const schema_1 = require("../../../../shared/validation/schema");
exports.userProfileUpdateSchema = zod_1.default.object({
    name: schema_1.nameSchema,
    username: schema_1.usernameSchema,
    about: zod_1.default.string().min(10, 'About must be at least 10 characters long').max(100).optional(),
});
//# sourceMappingURL=user.validation.js.map