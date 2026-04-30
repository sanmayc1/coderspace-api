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
exports.ContestRepository = void 0;
const tsyringe_1 = require("tsyringe");
const base_repository_1 = require("./base-repository");
const contest_model_1 = require("../../frameworks/database/models/contest.model");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const mongoose_1 = require("mongoose");
const mongo_utils_1 = require("../../shared/utils/mongo-utils");
const mongoose_2 = __importDefault(require("mongoose"));
let ContestRepository = class ContestRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(contest_model_1.ContestModel, dto_mapper_1.contestRepositoryMapper.toEntity, dto_mapper_1.contestRepositoryMapper.toModel);
    }
    async getCompanyContests(data) {
        const filter = {
            creatorId: new mongoose_1.Types.ObjectId(data.creatorId),
        };
        if (data.search) {
            filter.title = { $regex: data.search, $options: 'i' };
        }
        const [docs, total] = await Promise.all([
            contest_model_1.ContestModel.find(filter).sort({ createdAt: -1 }).skip(data.skip).limit(data.limit).lean(),
            contest_model_1.ContestModel.countDocuments(filter),
        ]);
        return {
            contests: docs.map(dto_mapper_1.contestRepositoryMapper.toEntity),
            total,
        };
    }
    async getAllContests(data) {
        const filter = data.filter ? (0, mongo_utils_1.convertToMongoFilter)(data.filter) : {};
        const relations = data.relations ? data.relations.join(' ') : '';
        const skip = data.skip ?? 0;
        const limit = data.limit ?? 6;
        const [doc, total] = await Promise.all([
            contest_model_1.ContestModel.find(filter)
                .populate(relations)
                .sort({ dateAndTime: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            contest_model_1.ContestModel.countDocuments(filter),
        ]);
        return {
            contests: doc.map(dto_mapper_1.contestRepositoryMapper.toEntity),
            count: total,
        };
    }
    async getContestWithAllDetails(id) {
        const doc = await contest_model_1.ContestModel.findById(id)
            .populate('skillsIds')
            .populate('domainId')
            .populate('creatorId')
            .populate({
            path: 'problemsIds',
            populate: [{ path: 'skillsIds' }, { path: 'domainId' }],
        });
        return doc ? dto_mapper_1.contestRepositoryMapper.toEntity(doc) : null;
    }
    async getAllProblemsOfContest(id) {
        const doc = await contest_model_1.ContestModel.findById(id)
            .populate('problemsIds')
            .populate({
            path: 'problemsIds',
            populate: [{ path: 'skillsIds' }, { path: 'domainId' }, { path: 'addedLanguagesId' }],
        });
        return {
            problems: (doc?.problemsIds).map(dto_mapper_1.problemRepositoryMapper.toEntity),
            endDateAndTime: doc?.endDateAndTime
        };
    }
    async getCompanyDashboardStats(creatorId) {
        const creatorObjectId = new mongoose_1.Types.ObjectId(creatorId);
        const now = new Date();
        const [totalContests, activeContests, upcomingContests, contests] = await Promise.all([
            contest_model_1.ContestModel.countDocuments({ creatorId: creatorObjectId }),
            contest_model_1.ContestModel.countDocuments({ creatorId: creatorObjectId, dateAndTime: { $lte: now }, endDateAndTime: { $gte: now } }),
            contest_model_1.ContestModel.countDocuments({ creatorId: creatorObjectId, dateAndTime: { $gt: now } }),
            contest_model_1.ContestModel.find({ creatorId: creatorObjectId }).select('_id').lean()
        ]);
        const contestIds = contests.map((c) => c._id);
        const ContestAttemptModel = mongoose_2.default.model('ContestAttempt');
        const totalParticipants = await ContestAttemptModel.countDocuments({ contestId: { $in: contestIds } });
        const currentYear = new Date().getFullYear();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyStats = await ContestAttemptModel.aggregate([
            {
                $match: {
                    contestId: { $in: contestIds },
                    startDateAndTime: {
                        $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
                        $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$startDateAndTime" },
                    participants: { $sum: 1 },
                    submissions: { $sum: { $cond: [{ $isNumber: "$totalSubmissions" }, "$totalSubmissions", 0] } }
                }
            }
        ]);
        const monthlyParticipantsData = months.map((name, index) => {
            const monthData = monthlyStats.find((stat) => stat._id === index + 1);
            return {
                name,
                participants: monthData ? monthData.participants : 0,
                submissions: monthData ? monthData.submissions : 0
            };
        });
        return {
            totalContests,
            activeContests,
            upcomingContests,
            totalParticipants,
            monthlyParticipantsData,
        };
    }
};
exports.ContestRepository = ContestRepository;
exports.ContestRepository = ContestRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], ContestRepository);
//# sourceMappingURL=contest-repository.js.map