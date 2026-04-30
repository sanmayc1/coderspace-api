"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyContestQuerySchema = exports.updateContestSchema = exports.createContestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const constant_1 = require("../../../../shared/constant");
const objectId = zod_1.default.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');
const rewardSchema = zod_1.default.object({
    rank: zod_1.default
        .number({ message: 'Rank must be a number' })
        .int({ message: 'Rank must be an integer' })
        .positive({ message: 'Rank must be greater than 0' }),
    description: zod_1.default.string().min(1, 'Reward description is required'),
});
exports.createContestSchema = zod_1.default.object({
    title: zod_1.default.string().min(1, 'Title is required'),
    description: zod_1.default.string().min(1, 'Description is required'),
    domain: objectId,
    skills: zod_1.default.array(objectId).nonempty('At least one skill is required'),
    problems: zod_1.default.array(objectId).nonempty('At least one problem is required'),
    rewards: zod_1.default.array(rewardSchema).nonempty('At least one reward is required'),
    dateAndTime: zod_1.default.string().refine((val) => !Number.isNaN(Date.parse(val)), {
        message: 'dateAndTime must be a valid ISO string',
    }),
    duration: zod_1.default
        .number({ message: 'Duration must be a number' })
        .int({ message: 'Duration must be an integer' })
        .positive({ message: 'Duration must be greater than 0' }),
    visibility: zod_1.default.enum(constant_1.VIEW),
});
exports.updateContestSchema = exports.createContestSchema.extend({
    id: objectId,
});
exports.companyContestQuerySchema = zod_1.default.object({
    search: zod_1.default.string().optional().default(''),
    page: zod_1.default.coerce.number().int().positive().optional().default(1),
});
//# sourceMappingURL=schema.js.map