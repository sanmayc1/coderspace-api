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
exports.FollowCoders = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
let FollowCoders = class FollowCoders {
    _userRepository;
    _followerRepository;
    constructor(_userRepository, _followerRepository) {
        this._userRepository = _userRepository;
        this._followerRepository = _followerRepository;
    }
    async execute(accountId, followingId) {
        const requestedUser = await this._userRepository.findByAccountId(accountId);
        if (!requestedUser) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.USER_NOT_FOUND);
        }
        const followingUser = await this._userRepository.findById(followingId);
        if (!followingUser) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.USER_NOT_FOUND);
        }
        const isFollowing = await this._followerRepository.findFollowerByUserIdAndFolloweeId(requestedUser._id, followingUser._id);
        if (isFollowing) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.USER_ALREADY_FOLLOWING);
        }
        await this._followerRepository.create({
            followerId: requestedUser._id,
            followeeId: followingUser._id,
        });
    }
};
exports.FollowCoders = FollowCoders;
exports.FollowCoders = FollowCoders = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IUserRepository')),
    __param(1, (0, tsyringe_1.inject)('IFollowerRepository')),
    __metadata("design:paramtypes", [Object, Object])
], FollowCoders);
//# sourceMappingURL=follow-coder-usecase.js.map