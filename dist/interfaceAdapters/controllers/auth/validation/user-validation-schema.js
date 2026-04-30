"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.UpdatePasswordSchema = exports.PasswordSchema = exports.UserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const schema_1 = require("../../../../shared/validation/schema");
const regex_1 = require("../../../../shared/validation/regex");
exports.UserSchema = zod_1.default
    .object({
    name: schema_1.nameSchema,
    email: zod_1.default.string().regex(regex_1.strongEmailRegex, { message: 'Invalid email format' }),
    username: schema_1.usernameSchema,
    password: schema_1.passwordSchema,
})
    .strict();
exports.PasswordSchema = zod_1.default.object({
    password: schema_1.passwordSchema,
});
exports.UpdatePasswordSchema = zod_1.default.object({
    currentPassword: schema_1.passwordSchema,
    newPassword: schema_1.passwordSchema,
});
exports.LoginSchema = zod_1.default.object({
    email: zod_1.default.string().regex(regex_1.strongEmailRegex, { message: 'Invalid email format' }),
    password: zod_1.default.string().min(7, { message: 'Invalid credentials' }),
});
//# sourceMappingURL=user-validation-schema.js.map