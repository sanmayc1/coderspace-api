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
exports.UserGetAllProblemsUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const mappers_1 = require("../../dtos/mappers/mappers");
let UserGetAllProblemsUsecase = class UserGetAllProblemsUsecase {
    _problemRepository;
    constructor(_problemRepository) {
        this._problemRepository = _problemRepository;
    }
    async execute(data) {
        const relations = ['skillsIds'];
        const projections = [
            '_id',
            'title',
            'problemNumber',
            'skillsIds',
            'difficulty',
            'view',
            'isPremium',
        ];
        const filter = {
            title: { op: 'contains', value: data.search || '' },
            view: { op: 'eq', value: 'public' },
            ...(data.difficulty && { difficulty: { op: 'eq', value: data.difficulty || 'easy' } }),
            ...(data.skill && { skillsIds: { op: 'in', value: data.skill || '' } }),
        };
        const limit = 4;
        const skip = (data.page - 1) * limit;
        const sort = { problemNumber: 'asc' };
        const doc = await this._problemRepository.getAllProblems({
            filter,
            limit,
            skip,
            projections,
            relations,
            sort,
        });
        const totalPages = Math.ceil(doc.total / limit);
        const problems = doc.problems.map((s) => mappers_1.userGetAllProblemsUsecaseMapper.toResponse(s));
        return {
            problems,
            totalPages,
            currentPage: data.page,
        };
    }
};
exports.UserGetAllProblemsUsecase = UserGetAllProblemsUsecase;
exports.UserGetAllProblemsUsecase = UserGetAllProblemsUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IProblemRepository')),
    __metadata("design:paramtypes", [Object])
], UserGetAllProblemsUsecase);
//# sourceMappingURL=user-get-all-problem.usecase.js.map