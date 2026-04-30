"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRegisterSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const regex_1 = require("../../../../shared/validation/regex");
const schema_1 = require("../../../../shared/validation/schema");
exports.CompanyRegisterSchema = zod_1.default.object({
    name: schema_1.nameSchema,
    email: zod_1.default.string().trim().regex(regex_1.strongEmailRegex, { message: 'Invalid email format' }),
    gstin: zod_1.default.string().trim().regex(regex_1.gstinRegex, {
        message: 'Invalid GSTIN',
    }),
    password: schema_1.passwordSchema,
});
//# sourceMappingURL=company-validation-schema.js.map