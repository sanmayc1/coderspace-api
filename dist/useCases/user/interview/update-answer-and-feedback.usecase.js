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
exports.UpdateAnswerAndFeedbackUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
let UpdateAnswerAndFeedbackUsecase = class UpdateAnswerAndFeedbackUsecase {
    _interviewQuestionsRepository;
    _interviewSessionRepository;
    _geminiService;
    constructor(_interviewQuestionsRepository, _interviewSessionRepository, _geminiService) {
        this._interviewQuestionsRepository = _interviewQuestionsRepository;
        this._interviewSessionRepository = _interviewSessionRepository;
        this._geminiService = _geminiService;
    }
    async execute(sessionId, order, answer) {
        const existSession = await this._interviewSessionRepository.findById(sessionId);
        if (!existSession) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.SESSION_NOT_FOUND);
        }
        const existQuestion = await this._interviewQuestionsRepository.findBySessionIdAndOrder(sessionId, order);
        if (!existQuestion) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.INTERVIEW_QUESTION_NOT_FOUND);
        }
        await this._interviewQuestionsRepository.updateById(existQuestion._id, {
            answer,
            attempted: true,
        });
    }
};
exports.UpdateAnswerAndFeedbackUsecase = UpdateAnswerAndFeedbackUsecase;
exports.UpdateAnswerAndFeedbackUsecase = UpdateAnswerAndFeedbackUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IInterviewQuestionsRepository')),
    __param(1, (0, tsyringe_1.inject)('IInterviewSessionRepository')),
    __param(2, (0, tsyringe_1.inject)('IGeminiService')),
    __metadata("design:paramtypes", [Object, Object, Object])
], UpdateAnswerAndFeedbackUsecase);
//# sourceMappingURL=update-answer-and-feedback.usecase.js.map