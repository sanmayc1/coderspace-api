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
exports.ContestAttemptRepository = void 0;
const tsyringe_1 = require("tsyringe");
const base_repository_1 = require("./base-repository");
const contest_attempt_model_1 = require("../../frameworks/database/models/contest-attempt.model");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const mongoose_1 = require("mongoose");
let ContestAttemptRepository = class ContestAttemptRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(contest_attempt_model_1.ContestAttemptModel, dto_mapper_1.contestAttemptRepositoryMapper.toEntity, dto_mapper_1.contestAttemptRepositoryMapper.toModel);
    }
    async getLeaderBoardByContestId(contestId, skip, search, limit) {
        const pipeline = [
            {
                $match: {
                    contestId: new mongoose_1.Types.ObjectId(contestId),
                    score: { $gt: 1 },
                },
            },
            {
                $addFields: {
                    timeTaken: {
                        $subtract: ['$endDateAndTime', '$startDateAndTime'],
                    },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'user.accountId',
                    foreignField: '_id',
                    as: 'account',
                },
            },
            { $unwind: '$account' },
        ];
        // 🔍 SEARCH
        if (search?.trim()) {
            pipeline.push({
                $match: {
                    $or: [
                        { 'user.username': { $regex: search, $options: 'i' } },
                        { 'account.name': { $regex: search, $options: 'i' } },
                    ],
                },
            });
        }
        pipeline.push({
            $sort: {
                score: -1,
                solvedProblems: -1,
                totalSubmissions: 1,
                timeTaken: 1,
            },
        }, { $skip: skip }, { $limit: limit }, {
            $project: {
                _id: 0,
                userId: '$user._id',
                username: '$user.username',
                name: '$account.name',
                profileUrl: '$account.profileUrl',
                badge: '$user.badge',
                solvedProblems: 1,
                totalSubmissions: 1,
                timeTaken: 1,
                totalProblems: 1,
                score: 1,
            },
        });
        const leaderboard = await contest_attempt_model_1.ContestAttemptModel.aggregate(pipeline);
        const totalCountPipeline = pipeline
            .filter((stage) => !stage.$skip && !stage.$limit && !stage.$project)
            .concat({ $count: 'total' });
        const countResult = await contest_attempt_model_1.ContestAttemptModel.aggregate(totalCountPipeline);
        const total = countResult[0]?.total || 0;
        const mapedLeaderboard = leaderboard.map((l) => ({
            userId: l.userId,
            username: l.username,
            name: l.name,
            profileUrl: l.profileUrl,
            badge: l.badge,
            solvedProblems: l.solvedProblems,
            totalSubmissions: l.totalSubmissions,
            timeTaken: l.timeTaken,
            score: l.score,
            contestName: l.contestName,
            totalProblems: l.totalProblems,
        }));
        return {
            leaderboard: mapedLeaderboard,
            total,
        };
    }
    async updateContestByUserIdAndContestId(userId, contestId, update) {
        await contest_attempt_model_1.ContestAttemptModel.findOneAndUpdate({ userId, contestId }, update);
    }
    async getContestByUserIdAndContestId(userId, contestId) {
        const contestAttempt = await contest_attempt_model_1.ContestAttemptModel.findOne({ userId, contestId });
        return contestAttempt ? dto_mapper_1.contestAttemptRepositoryMapper.toEntity(contestAttempt) : null;
    }
};
exports.ContestAttemptRepository = ContestAttemptRepository;
exports.ContestAttemptRepository = ContestAttemptRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], ContestAttemptRepository);
//# sourceMappingURL=contest-attempt-repository.js.map