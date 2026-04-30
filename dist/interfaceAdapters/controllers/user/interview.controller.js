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
exports.InterviewController = void 0;
const tsyringe_1 = require("tsyringe");
const auth_1 = require("../auth");
let InterviewController = class InterviewController {
    _getAllInterviewsUserUsecase;
    _createInterviewSessionUsecase;
    _getInterviewQuestionUsecase;
    _updateAnswerAndFeedbackUsecase;
    _finishInterviewUsecase;
    _getInterviewFeedbackUsecase;
    constructor(_getAllInterviewsUserUsecase, _createInterviewSessionUsecase, _getInterviewQuestionUsecase, _updateAnswerAndFeedbackUsecase, _finishInterviewUsecase, _getInterviewFeedbackUsecase) {
        this._getAllInterviewsUserUsecase = _getAllInterviewsUserUsecase;
        this._createInterviewSessionUsecase = _createInterviewSessionUsecase;
        this._getInterviewQuestionUsecase = _getInterviewQuestionUsecase;
        this._updateAnswerAndFeedbackUsecase = _updateAnswerAndFeedbackUsecase;
        this._finishInterviewUsecase = _finishInterviewUsecase;
        this._getInterviewFeedbackUsecase = _getInterviewFeedbackUsecase;
    }
    async getAllInterviews(req, res) {
        const page = Number(req.query.page) || 1;
        const accountId = req.user?.accountId;
        const data = await this._getAllInterviewsUserUsecase.execute(page, accountId);
        res
            .status(auth_1.HTTP_STATUS.OK)
            .json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.INTERVIEWS_FETCHED, data));
    }
    async createInterviewSession(req, res) {
        const { interviewId } = req.body;
        const accountId = req.user?.accountId;
        const data = await this._createInterviewSessionUsecase.execute(interviewId, accountId);
        res
            .status(auth_1.HTTP_STATUS.OK)
            .json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.INTERVIEW_SESSION_CREATED, data));
    }
    async getInterviewQuestion(req, res) {
        const { sessionId } = req.params;
        const order = Number(req.query.order) || 1;
        const data = await this._getInterviewQuestionUsecase.execute(sessionId, order);
        res
            .status(auth_1.HTTP_STATUS.OK)
            .json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.INTERVIEW_QUESTION_FETCHED, data));
    }
    async submitAnswer(req, res) {
        const { sessionId, order, answer } = req.body;
        await this._updateAnswerAndFeedbackUsecase.execute(sessionId, order, answer);
        res
            .status(auth_1.HTTP_STATUS.OK)
            .json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.ANSWER_SUBMITTED));
    }
    async finishInterview(req, res) {
        const { sessionId } = req.body;
        await this._finishInterviewUsecase.execute(sessionId);
        res
            .status(auth_1.HTTP_STATUS.OK)
            .json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.INTERVIEW_FINISHED));
    }
    async getInterviewFeedback(req, res) {
        const { sessionId } = req.params;
        const data = await this._getInterviewFeedbackUsecase.execute(sessionId);
        res
            .status(auth_1.HTTP_STATUS.OK)
            .json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.INTERVIEW_FEEDBACK_FETCHED, data));
    }
};
exports.InterviewController = InterviewController;
exports.InterviewController = InterviewController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IGetAllInterviewsUserUsecase')),
    __param(1, (0, tsyringe_1.inject)('ICreateInterviewSessionUsecase')),
    __param(2, (0, tsyringe_1.inject)('IGetInterviewQuestionUsecase')),
    __param(3, (0, tsyringe_1.inject)('IUpdateAnswerAndFeedbackUsecase')),
    __param(4, (0, tsyringe_1.inject)('IFinishInterviewUsecase')),
    __param(5, (0, tsyringe_1.inject)('IGetInterviewFeedbackUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], InterviewController);
//# sourceMappingURL=interview.controller.js.map