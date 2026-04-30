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
exports.GetUserUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
const mappers_1 = require("../../dtos/mappers/mappers");
let GetUserUsecase = class GetUserUsecase {
    _userRepository;
    _accountRepository;
    _followerRepository;
    _submitProblemRepository;
    constructor(_userRepository, _accountRepository, _followerRepository, _submitProblemRepository) {
        this._userRepository = _userRepository;
        this._accountRepository = _accountRepository;
        this._followerRepository = _followerRepository;
        this._submitProblemRepository = _submitProblemRepository;
    }
    async execute(accountId) {
        const account = await this._accountRepository.findById(accountId);
        if (!account) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
        }
        const user = await this._userRepository.findByAccountId(accountId);
        if (!user) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.USER_NOT_FOUND);
        }
        const solvedProblemsCount = await this._submitProblemRepository.getAllSolvedProblemsCount(String(user._id));
        const followersAndFollowingCount = await this._followerRepository.countFollowersAndFollowingCount(String(user._id));
        const response = mappers_1.getUserUsecaseMapper.toOutput(user, account, followersAndFollowingCount, solvedProblemsCount);
        return response;
    }
};
exports.GetUserUsecase = GetUserUsecase;
exports.GetUserUsecase = GetUserUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IUserRepository')),
    __param(1, (0, tsyringe_1.inject)('IAccountRepository')),
    __param(2, (0, tsyringe_1.inject)('IFollowerRepository')),
    __param(3, (0, tsyringe_1.inject)('ISubmitProblemRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], GetUserUsecase);
//# sourceMappingURL=user-profile.usecase.js.map