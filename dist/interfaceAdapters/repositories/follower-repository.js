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
exports.FollowerRepository = void 0;
const tsyringe_1 = require("tsyringe");
const follower_model_1 = require("../../frameworks/database/models/follower.model");
const base_repository_1 = require("./base-repository");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const mongoose_1 = __importDefault(require("mongoose"));
let FollowerRepository = class FollowerRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(follower_model_1.FollowerModel, dto_mapper_1.followerRepositoryMapper.toEntity, dto_mapper_1.followerRepositoryMapper.toModel);
    }
    async countFollowersAndFollowingCount(userId) {
        const viewerId = new mongoose_1.default.Types.ObjectId(userId);
        const counts = await follower_model_1.FollowerModel.aggregate([
            {
                $facet: {
                    pipeline1: [
                        {
                            $match: { followerId: viewerId },
                        },
                        {
                            $count: 'followingCount',
                        },
                    ],
                    pipeline2: [
                        {
                            $match: { followeeId: viewerId },
                        },
                        {
                            $count: 'followersCount',
                        },
                    ],
                },
            },
        ]);
        return {
            followersCount: counts[0].pipeline2[0]?.followersCount || 0,
            followingCount: counts[0].pipeline1[0]?.followingCount || 0,
        };
    }
    // findFollowerByUserId(userId: string): Promise<IFollowerEntity[]> {
    //   throw new Error('Method not implemented.');
    // }
    // findFollowingByUserId(userId: string): Promise<IFollowerEntity[]> {
    //   throw new Error('Method not implemented.');
    // }
    async findFollowerByUserIdAndFolloweeId(followerId, followeeId) {
        const doc = await follower_model_1.FollowerModel.findOne({
            followerId: followerId,
            followeeId: followeeId,
        });
        return doc ? dto_mapper_1.followerRepositoryMapper.toEntity(doc) : null;
    }
};
exports.FollowerRepository = FollowerRepository;
exports.FollowerRepository = FollowerRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], FollowerRepository);
//# sourceMappingURL=follower-repository.js.map