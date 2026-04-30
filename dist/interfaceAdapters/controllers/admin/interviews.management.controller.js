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
exports.InterviewManagementAdminController = void 0;
const tsyringe_1 = require("tsyringe");
const schema_1 = require("./validation/schema");
const auth_1 = require("../auth");
let InterviewManagementAdminController = class InterviewManagementAdminController {
    _createInterviewUseCase;
    _getAllInterviewsUsecase;
    _deleteInterviewUseCase;
    constructor(_createInterviewUseCase, _getAllInterviewsUsecase, _deleteInterviewUseCase) {
        this._createInterviewUseCase = _createInterviewUseCase;
        this._getAllInterviewsUsecase = _getAllInterviewsUsecase;
        this._deleteInterviewUseCase = _deleteInterviewUseCase;
    }
    async createInterview(req, res) {
        const validatedData = schema_1.interviewSchema.parse(req.body);
        const interview = await this._createInterviewUseCase.execute(validatedData);
        res.status(auth_1.HTTP_STATUS.OK).json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.INTERVIEW_CREATED, interview));
    }
    async getAllInterviews(req, res) {
        const query = req.query;
        const valiedatedQuery = schema_1.interviewQuerySchema.parse(query);
        const data = await this._getAllInterviewsUsecase.execute(valiedatedQuery);
        res.status(auth_1.HTTP_STATUS.OK).json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.INTERVIEWS_FETCHED, data));
    }
    async deleteInterview(req, res) {
        const id = req.params.id;
        const interview = await this._deleteInterviewUseCase.execute(id);
        res.status(auth_1.HTTP_STATUS.OK).json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.INTERVIEW_DELETED, interview));
    }
};
exports.InterviewManagementAdminController = InterviewManagementAdminController;
exports.InterviewManagementAdminController = InterviewManagementAdminController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('ICreateInterviewUsecase')),
    __param(1, (0, tsyringe_1.inject)('IGetAllInterviewsUsecase')),
    __param(2, (0, tsyringe_1.inject)('IDeleteInterviewUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object])
], InterviewManagementAdminController);
//# sourceMappingURL=interviews.management.controller.js.map