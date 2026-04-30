"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interviewQuerySchema = exports.interviewSchema = exports.updateProblemSchema = exports.testcaseSchema = exports.languageRequestSchema = exports.mongoObjectIdSchema = exports.querySchema = exports.createProblemSchema = exports.UserProfileUpdateSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const constant_1 = require("../../../../shared/constant");
exports.UserProfileUpdateSchema = zod_1.default.object({
    level: zod_1.default
        .number({ message: 'Please Enter a valid level' })
        .max(100, { message: 'Maximum Level 100' })
        .refine((val) => !isNaN(val), {
        message: 'Please Enter a valid level',
    }),
    badge: zod_1.default
        .string({ message: 'Please Enter a valid badge' })
        .refine((val) => constant_1.BADGE.includes(val), { message: 'Please Enter a valid badge' }),
    userId: zod_1.default.string().min(1, 'Invalid UserId'),
});
const objectId = zod_1.default.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');
exports.createProblemSchema = zod_1.default.object({
    title: zod_1.default.string().min(1, 'Title is required'),
    constrain: zod_1.default.string().min(1, 'Constraint is required'),
    description: zod_1.default.string().min(1, 'Description is required'),
    difficulty: zod_1.default.enum(constant_1.DIFFICULTY),
    domain: objectId,
    premium: zod_1.default.boolean(),
    skills: zod_1.default.array(objectId).nonempty('Skills array cannot be empty'),
    validationType: zod_1.default.enum(constant_1.VALIDATOR_TYPE),
    examples: zod_1.default
        .array(zod_1.default.object({
        id: zod_1.default.string().min(8, 'Example ID must be a valid'),
        explanation: zod_1.default.string().min(1, 'Explanation is required'),
        input: zod_1.default.string().min(1, 'Input is required'),
        output: zod_1.default.string().min(1, 'Output is required'),
    }))
        .nonempty('At least one example is required'),
});
exports.querySchema = zod_1.default.object({
    page: zod_1.default.string().regex(/^\d+$/).transform(Number).default(1),
    sortBy: zod_1.default.string().optional().default('createdAt'),
    search: zod_1.default.string().optional().default(''),
    difficulty: zod_1.default.enum(constant_1.DIFFICULTY).optional(),
    skill: objectId.optional(),
});
exports.mongoObjectIdSchema = zod_1.default.object({
    id: objectId,
});
exports.languageRequestSchema = zod_1.default.object({
    languageId: objectId,
    templateCode: zod_1.default
        .string()
        .min(1, 'templateCode is required')
        .max(100_000, 'templateCode too large'),
    fnName: zod_1.default
        .string()
        .min(1, 'fnName is required')
        .max(200, 'fnName too long')
        .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, 'fnName must be a valid identifier'),
    solution: zod_1.default.string().min(0).max(200_000, 'solution too large'),
});
exports.testcaseSchema = zod_1.default.object({
    input: zod_1.default.string().min(1, 'Input is required'),
    output: zod_1.default.string().min(1, 'Output is required'),
    problemId: objectId,
    example: zod_1.default.boolean().optional(),
});
exports.updateProblemSchema = exports.createProblemSchema.omit({ validationType: true }).extend({
    problemId: objectId,
});
exports.interviewSchema = zod_1.default.object({
    title: zod_1.default.string().min(3, 'Title must be at least 3 characters'),
    description: zod_1.default.string().min(10, 'Description must be at least 10 characters'),
    context: zod_1.default.string().min(10, 'Context must be at least 10 characters'),
    numberOfQuestions: zod_1.default.coerce.number().min(1, 'At least 1 question is required'),
    difficulty: zod_1.default.enum(constant_1.DIFFICULTY, { message: "Invalid difficulty" }),
    duration: zod_1.default.coerce.number().min(1, 'Duration must be at least 1 minute'),
    premium: zod_1.default.boolean(),
});
exports.interviewQuerySchema = zod_1.default.object({
    page: zod_1.default.string().regex(/^\d+$/).transform(Number).default(1),
    limit: zod_1.default.string().regex(/^\d+$/).transform(Number).default(6),
    sortBy: zod_1.default.string().optional().default('createdAt'),
    search: zod_1.default.string().optional().default(''),
});
//# sourceMappingURL=schema.js.map