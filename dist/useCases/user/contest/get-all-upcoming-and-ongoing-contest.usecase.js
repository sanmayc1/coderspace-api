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
exports.GetAllUpcomingAndOngoingContestUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const mappers_1 = require("../../dtos/mappers/mappers");
let GetAllUpcomingAndOngoingContestUseCase = class GetAllUpcomingAndOngoingContestUseCase {
    contestRepository;
    constructor(contestRepository) {
        this.contestRepository = contestRepository;
    }
    async execute(page) {
        const skip = (page - 1) * 6;
        const limit = 6;
        const filter = {
            endDateAndTime: { op: 'gte', value: Date.now() },
            view: { op: 'eq', value: 'public' },
        };
        const relations = ['domainId', 'skillsIds', 'creatorId'];
        const projections = [
            '_id',
            'title',
            'dateAndTime',
            'view',
            'creatorId',
            'skillsIds',
            'domainId',
            'description',
            'duration',
        ];
        const docs = await this.contestRepository.getAllContests({
            skip,
            limit,
            filter,
            relations,
            projections,
        });
        const contests = docs.contests.map(mappers_1.getAllContestUsecaseMapper.toResponse);
        return {
            contests,
            totalPages: Math.ceil(docs.count / limit),
            currentPage: page,
        };
    }
};
exports.GetAllUpcomingAndOngoingContestUseCase = GetAllUpcomingAndOngoingContestUseCase;
exports.GetAllUpcomingAndOngoingContestUseCase = GetAllUpcomingAndOngoingContestUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IContestRepository')),
    __metadata("design:paramtypes", [Object])
], GetAllUpcomingAndOngoingContestUseCase);
//# sourceMappingURL=get-all-upcoming-and-ongoing-contest.usecase.js.map