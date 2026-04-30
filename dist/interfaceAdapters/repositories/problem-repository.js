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
exports.ProblemRepository = void 0;
const tsyringe_1 = require("tsyringe");
const problem_model_1 = require("../../frameworks/database/models/problem.model");
const base_repository_1 = require("./base-repository");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const mongo_utils_1 = require("../../shared/utils/mongo-utils");
let ProblemRepository = class ProblemRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(problem_model_1.ProblemModel, dto_mapper_1.problemRepositoryMapper.toEntity, dto_mapper_1.problemRepositoryMapper.toModel);
    }
    async getAllProblemWithoutLimit(options) {
        const filter = options.filter ? (0, mongo_utils_1.convertToMongoFilter)(options.filter) : {};
        const doc = await problem_model_1.ProblemModel.find(filter);
        return doc ? doc.map(dto_mapper_1.problemRepositoryMapper.toEntity) : [];
    }
    async getProblem(id, options) {
        const projection = options.projections ? (0, mongo_utils_1.convertToMongoProjection)(options.projections) : {};
        const relations = options.relations ? options.relations.join(' ') : '';
        const doc = await problem_model_1.ProblemModel.findOne({ _id: id }, projection).populate(relations);
        return doc ? dto_mapper_1.problemRepositoryMapper.toEntity(doc) : null;
    }
    async addLanguage(id, languageId) {
        await problem_model_1.ProblemModel.findByIdAndUpdate(id, {
            $push: { addedLanguagesId: languageId },
        });
    }
    async getAllProblems(data) {
        const filter = data.filter ? (0, mongo_utils_1.convertToMongoFilter)(data.filter) : {};
        const projection = data.projections ? (0, mongo_utils_1.convertToMongoProjection)(data.projections) : {};
        const sort = data.sort ? (0, mongo_utils_1.convertToMongoSort)(data.sort) : {};
        const relations = data.relations ? data.relations.join(' ') : '';
        const skip = data.skip ?? 0;
        const [docs, total] = await Promise.all([
            problem_model_1.ProblemModel.find(filter, projection)
                .populate(relations)
                .sort(sort)
                .skip(skip)
                .limit(data.limit)
                .lean(),
            problem_model_1.ProblemModel.countDocuments(filter),
        ]);
        return {
            problems: docs.map(dto_mapper_1.problemRepositoryMapper.toEntity),
            total,
        };
    }
    async findProblemCount() {
        return await problem_model_1.ProblemModel.countDocuments();
    }
};
exports.ProblemRepository = ProblemRepository;
exports.ProblemRepository = ProblemRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], ProblemRepository);
//# sourceMappingURL=problem-repository.js.map