"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noValueCheckSchema = exports.passwordSchema = exports.usernameSchema = exports.nameSchema = void 0;
const zod_1 = require("zod");
const regex_1 = require("./regex");
exports.nameSchema = zod_1.z
    .string()
    .min(1, { message: 'Name must be at least 2 characters long' })
    .trim()
    .regex(/^[a-zA-Z]/, {
    message: 'Name must contain only alphabetic characters',
});
exports.usernameSchema = zod_1.z
    .string()
    .lowercase({ message: 'Username must be in lowercase only' })
    .trim()
    .regex(regex_1.usernameRegex1, { message: 'Username must start with @' })
    .regex(regex_1.usernameRegex2, {
    message: 'Username can only lowercase contain letters, numbers, and _',
})
    .regex(regex_1.usernameRegex3, {
    message: 'Username must be at least 4 characters long',
});
exports.passwordSchema = zod_1.z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
})
    .trim()
    .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
    .regex(/[@$!%*?&]/, {
    message: 'Password must contain at least one special character',
});
exports.noValueCheckSchema = zod_1.z.string().min(1, 'Value cannot be empty');
//# sourceMappingURL=schema.js.map