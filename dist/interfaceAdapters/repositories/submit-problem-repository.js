"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitProblemRepository = void 0;
const tsyringe_1 = require("tsyringe");
const base_repository_1 = require("./base-repository");
const submit_problem_model_1 = require("../../frameworks/database/models/submit-problem.model");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const mongoose_1 = __importDefault(require("mongoose"));
let SubmitProblemRepository = class SubmitProblemRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(submit_problem_model_1.SubmitProblemModel, dto_mapper_1.submitProblemRepositoryMapper.toEntity, dto_mapper_1.submitProblemRepositoryMapper.toModel);
    }
    async getAllSolvedProblemsCount(userId) {
        const id = new mongoose_1.default.Types.ObjectId(userId);
        const doc = await submit_problem_model_1.SubmitProblemModel.aggregate([
            {
                $match: {
                    userId: id,
                    status: 'solved',
                },
            },
            {
                $group: {
                    _id: '$problemId',
                },
            },
            {
                $count: 'count',
            },
        ]);
        return doc[0]?.count || 0;
    }
    async getAllSubmissionByProblemIdAndUserId(problemId, userId) {
        const doc = await submit_problem_model_1.SubmitProblemModel.find({ problemId, userId }).sort({ createdAt: 1 });
        return doc ? doc.map((s) => dto_mapper_1.submitProblemRepositoryMapper.toEntity(s)) : [];
    }
};
exports.SubmitProblemRepository = SubmitProblemRepository;
exports.SubmitProblemRepository = SubmitProblemRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], SubmitProblemRepository);
//# sourceMappingURL=submit-problem-repository.js.map