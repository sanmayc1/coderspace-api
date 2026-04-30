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
exports.GetAllInterviewsUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const mappers_1 = require("../../dtos/mappers/mappers");
let GetAllInterviewsUsecase = class GetAllInterviewsUsecase {
    _interviewRepository;
    constructor(_interviewRepository) {
        this._interviewRepository = _interviewRepository;
    }
    async execute(query) {
        const sort = { [query.sortBy]: 'desc' };
        const filter = query.search
            ? { title: { op: 'contains', value: query.search } }
            : {};
        const limit = query.limit;
        const skip = (query.page - 1) * limit;
        const { interviews, total } = await this._interviewRepository.getAllInterviews({
            sort,
            skip,
            limit,
            filter,
        });
        const totalPages = Math.ceil(total / limit);
        return {
            currentPage: query.page,
            totalPages,
            interviews: interviews.map((interview) => mappers_1.createInterviewUsecaseMapper.toResponse(interview)),
            itemsPerPage: limit,
        };
    }
};
exports.GetAllInterviewsUsecase = GetAllInterviewsUsecase;
exports.GetAllInterviewsUsecase = GetAllInterviewsUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IInterviewRepository')),
    __metadata("design:paramtypes", [Object])
], GetAllInterviewsUsecase);
//# sourceMappingURL=get-all-interviews.usecase.js.map