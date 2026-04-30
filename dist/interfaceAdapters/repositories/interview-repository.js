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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewRepository = void 0;
const tsyringe_1 = require("tsyringe");
const base_repository_1 = require("./base-repository");
const interview_model_1 = require("../../frameworks/database/models/interview.model");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const mongo_utils_1 = require("../../shared/utils/mongo-utils");
let InterviewRepository = class InterviewRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(interview_model_1.InterviewModel, dto_mapper_1.interviewRepositoryMapper.toEntity, dto_mapper_1.interviewRepositoryMapper.toModel);
    }
    async getAllInterviews(query) {
        const limit = query.limit;
        const skip = query.skip;
        const sort = query.sort ? (0, mongo_utils_1.convertToMongoSort)(query.sort) : {};
        const filter = query.filter ? (0, mongo_utils_1.convertToMongoFilter)(query.filter) : {};
        const [interviews, total] = await Promise.all([
            interview_model_1.InterviewModel.find(filter).sort(sort).skip(skip).limit(limit),
            interview_model_1.InterviewModel.countDocuments(filter),
        ]);
        const mappedInterviews = interviews.map(dto_mapper_1.interviewRepositoryMapper.toEntity);
        return { interviews: mappedInterviews, total };
    }
};
exports.InterviewRepository = InterviewRepository;
exports.InterviewRepository = InterviewRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], InterviewRepository);
//# sourceMappingURL=interview-repository.js.map