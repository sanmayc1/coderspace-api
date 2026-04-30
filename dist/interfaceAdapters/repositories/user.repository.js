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
exports.UserRepository = void 0;
const tsyringe_1 = require("tsyringe");
const user_model_1 = require("../../frameworks/database/models/user.model");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const base_repository_1 = require("./base-repository");
const mongo_utils_1 = require("../../shared/utils/mongo-utils");
const mongoose_1 = __importDefault(require("mongoose"));
let UserRepository = class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(user_model_1.UserModel, dto_mapper_1.userMapperRepo.toEntity, dto_mapper_1.userMapperRepo.toModel);
    }
    async getAllUsers(skip, limit, search, sort) {
        const filter = {
            'accountId.isVerified': true,
            $or: [
                { 'accountId.name': new RegExp(search, 'i') },
                { 'accountId.email': new RegExp(search, 'i') },
                { username: new RegExp(search, 'i') },
            ],
        };
        const sortOption = mongo_utils_1.USER_SORTING[sort];
        const doc = await user_model_1.UserModel.aggregate([
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'accountId',
                    foreignField: '_id',
                    as: 'accountId',
                },
            },
            { $unwind: { path: '$accountId', preserveNullAndEmptyArrays: true } },
            { $match: filter },
            ...(sortOption ? [{ $sort: sortOption }] : []),
            { $skip: skip },
            { $limit: limit },
        ]);
        const count = await user_model_1.UserModel.find()
            .populate({
            path: 'accountId',
            match: { isVerified: true },
        })
            .countDocuments();
        return {
            users: doc.map((user) => dto_mapper_1.userMapperRepo.toEntity(user)),
            count,
        };
    }
    async findByAccountId(id) {
        const doc = await user_model_1.UserModel.findOne({ accountId: id });
        return doc ? dto_mapper_1.userMapperRepo.toEntity(doc) : null;
    }
    async findByUsername(username) {
        const user = await user_model_1.UserModel.findOne({ username });
        return user ? dto_mapper_1.userMapperRepo.toEntity(user) : user;
    }
    async getAllUsersWithFollowing(userId) {
        const viewerId = new mongoose_1.default.Types.ObjectId(userId);
        const doc = await user_model_1.UserModel.aggregate([
            {
                $match: { _id: { $ne: viewerId } },
            },
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'accountId',
                    foreignField: '_id',
                    as: 'accountId',
                },
            },
            { $unwind: { path: '$accountId', preserveNullAndEmptyArrays: true } },
            { $match: { 'accountId.isVerified': true } },
            {
                $lookup: {
                    from: 'followers',
                    let: { userId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [{ $eq: ['$followeeId', '$$userId'] }, { $eq: ['$followerId', viewerId] }],
                                },
                            },
                        },
                    ],
                    as: 'followers',
                },
            },
            {
                $addFields: {
                    isFollowing: { $gt: [{ $size: '$followers' }, 0] },
                },
            },
        ]);
        return doc
            ? doc.map((user) => ({ ...dto_mapper_1.userMapperRepo.toEntity(user), isFollowing: user.isFollowing }))
            : [];
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], UserRepository);
//# sourceMappingURL=user.repository.js.map