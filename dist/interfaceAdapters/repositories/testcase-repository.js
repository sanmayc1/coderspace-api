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
exports.TestcaseRepository = void 0;
const tsyringe_1 = require("tsyringe");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const testcase_model_1 = require("../../frameworks/database/models/testcase.model");
const base_repository_1 = require("./base-repository");
const mongo_utils_1 = require("../../shared/utils/mongo-utils");
let TestcaseRepository = class TestcaseRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(testcase_model_1.TestcaseModel, dto_mapper_1.testcaseRepositoryMapper.toEntity, dto_mapper_1.testcaseRepositoryMapper.toModel);
    }
    async bulkUpload(testcase) {
        testcase_model_1.TestcaseModel.insertMany(testcase);
    }
    async getTestcasesByProblemId(problemId, options) {
        const projection = options?.projections ? (0, mongo_utils_1.convertToMongoProjection)(options.projections) : {};
        const sort = options?.sort ? (0, mongo_utils_1.convertToMongoSort)(options.sort) : {};
        const relations = options?.relations ? options.relations.join(' ') : '';
        const skip = options?.skip ?? 0;
        const query = testcase_model_1.TestcaseModel.find({ problemId }, projection)
            .populate(relations)
            .sort(sort)
            .skip(skip);
        if (options?.limit !== undefined) {
            query.limit(options.limit);
        }
        const testcases = await query;
        return testcases.map((testcase) => dto_mapper_1.testcaseRepositoryMapper.toEntity(testcase));
    }
};
exports.TestcaseRepository = TestcaseRepository;
exports.TestcaseRepository = TestcaseRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], TestcaseRepository);
//# sourceMappingURL=testcase-repository.js.map