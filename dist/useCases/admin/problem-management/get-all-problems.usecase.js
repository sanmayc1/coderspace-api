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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProblemsUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const mongo_utils_1 = require("../../../shared/utils/mongo-utils");
const mappers_1 = require("../../dtos/mappers/mappers");
let GetAllProblemsUsecase = class GetAllProblemsUsecase {
    _problemRepository;
    constructor(_problemRepository) {
        this._problemRepository = _problemRepository;
    }
    async execute(data) {
        const sort = mongo_utils_1.PROBLEM_SORTING[data.sortBy] || mongo_utils_1.PROBLEM_SORTING.NEWEST;
        const filter = data.search
            ? { title: { op: 'contains', value: data.search } }
            : {};
        const projections = ['_id', 'title', 'problemNumber', 'view'];
        const relations = ['addedLanguagesId'];
        const limit = 4;
        const skip = (data.page - 1) * limit;
        const docs = await this._problemRepository.getAllProblems({
            filter,
            sort,
            projections,
            skip,
            limit,
            relations,
        });
        const totalPages = Math.ceil(docs.total / limit);
        const response = mappers_1.getAllProblemsUsecaseMapper.toResponse(totalPages, data.page, docs.problems);
        return response;
    }
};
exports.GetAllProblemsUsecase = GetAllProblemsUsecase;
exports.GetAllProblemsUsecase = GetAllProblemsUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IProblemRepository')),
    __metadata("design:paramtypes", [Object])
], GetAllProblemsUsecase);
//# sourceMappingURL=get-all-problems.usecase.js.map