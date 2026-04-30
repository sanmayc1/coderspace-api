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
exports.CreateInterviewSessionUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
let CreateInterviewSessionUsecase = class CreateInterviewSessionUsecase {
    _interviewSessionRepository;
    _interviewRepository;
    _accountRepository;
    _geminiService;
    _interviewQuestionsRepository;
    constructor(_interviewSessionRepository, _interviewRepository, _accountRepository, _geminiService, _interviewQuestionsRepository) {
        this._interviewSessionRepository = _interviewSessionRepository;
        this._interviewRepository = _interviewRepository;
        this._accountRepository = _accountRepository;
        this._geminiService = _geminiService;
        this._interviewQuestionsRepository = _interviewQuestionsRepository;
    }
    async execute(interviewId, accountId) {
        const interviewExist = await this._interviewRepository.findById(interviewId);
        if (!interviewExist) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.INTERVIEW_NOT_FOUND);
        }
        const accountExist = await this._accountRepository.findById(accountId);
        if (!accountExist) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
        }
        const sessionExists = await this._interviewSessionRepository.checkSessionExist(interviewId, accountId);
        if (sessionExists) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.SESSION_ALREADY_EXISTS);
        }
        const questions = await this._geminiService.generateInterviewQuestions(interviewExist, accountExist.name);
        const interviewSession = await this._interviewSessionRepository.create({
            accountId,
            interviewId,
            completedAt: new Date(),
            startedAt: new Date(),
        });
        for (let i = 0; i < questions.length; i++) {
            await this._interviewQuestionsRepository.create({
                sessionId: interviewSession._id,
                question: questions[i].question,
                order: questions[i].questionNumber,
            });
        }
        return { sessionId: interviewSession._id };
    }
};
exports.CreateInterviewSessionUsecase = CreateInterviewSessionUsecase;
exports.CreateInterviewSessionUsecase = CreateInterviewSessionUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IInterviewSessionRepository')),
    __param(1, (0, tsyringe_1.inject)('IInterviewRepository')),
    __param(2, (0, tsyringe_1.inject)('IAccountRepository')),
    __param(3, (0, tsyringe_1.inject)('IGeminiService')),
    __param(4, (0, tsyringe_1.inject)('IInterviewQuestionsRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], CreateInterviewSessionUsecase);
//# sourceMappingURL=create-interview-session.usecase.js.map