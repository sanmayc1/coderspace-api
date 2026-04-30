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
exports.JoinContestUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
let JoinContestUsecase = class JoinContestUsecase {
    _contestRepository;
    _userRepository;
    _contestAttemptRepository;
    constructor(_contestRepository, _userRepository, _contestAttemptRepository) {
        this._contestRepository = _contestRepository;
        this._userRepository = _userRepository;
        this._contestAttemptRepository = _contestAttemptRepository;
    }
    async execute(contestId, accountId) {
        const contest = await this._contestRepository.findById(contestId);
        if (!contest) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.CONTEST_NOT_FOUND);
        }
        const user = await this._userRepository.findByAccountId(accountId);
        if (!user) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.USER_NOT_FOUND);
        }
        const contestAttempt = await this._contestAttemptRepository.getContestByUserIdAndContestId(user._id, contest._id);
        if (contestAttempt) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.CONTEST_ALREADY_JOINED);
        }
        await this._contestAttemptRepository.create({
            contestId: contest._id,
            userId: user._id,
            startDateAndTime: new Date(),
            endDateAndTime: new Date(contest.endDateAndTime),
        });
    }
};
exports.JoinContestUsecase = JoinContestUsecase;
exports.JoinContestUsecase = JoinContestUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IContestRepository')),
    __param(1, (0, tsyringe_1.inject)('IUserRepository')),
    __param(2, (0, tsyringe_1.inject)('IContestAttemptRepository')),
    __metadata("design:paramtypes", [Object, Object, Object])
], JoinContestUsecase);
//# sourceMappingURL=join-contest.usecase.js.map