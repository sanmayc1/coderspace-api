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
exports.UserProblemController = void 0;
const tsyringe_1 = require("tsyringe");
const schema_1 = require("../admin/validation/schema");
const index_1 = require("../auth/index");
let UserProblemController = class UserProblemController {
    _userGetAllProblemsUsecase;
    _userGetProblemUsecase;
    _runProblemUsecase;
    _submitProblemUsecase;
    _getProblemUpdatesUsecase;
    constructor(_userGetAllProblemsUsecase, _userGetProblemUsecase, _runProblemUsecase, _submitProblemUsecase, _getProblemUpdatesUsecase) {
        this._userGetAllProblemsUsecase = _userGetAllProblemsUsecase;
        this._userGetProblemUsecase = _userGetProblemUsecase;
        this._runProblemUsecase = _runProblemUsecase;
        this._submitProblemUsecase = _submitProblemUsecase;
        this._getProblemUpdatesUsecase = _getProblemUpdatesUsecase;
    }
    async getAllProblems(req, res) {
        const validatedQurey = schema_1.querySchema.parse(req.query);
        const response = await this._userGetAllProblemsUsecase.execute(validatedQurey);
        res
            .status(index_1.HTTP_STATUS.OK)
            .json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.GET_ALL_PROBLEMS, response));
    }
    async getProblem(req, res) {
        const { id } = req.params;
        const validated = schema_1.mongoObjectIdSchema.parse({ id });
        const response = await this._userGetProblemUsecase.execute(validated.id);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.GET_PROBLEM, response));
    }
    async runProblem(req, res) {
        const { language, code, problemId } = req.body;
        const response = await this._runProblemUsecase.execute(language, code, problemId);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.RUN_PROBLEM, response));
    }
    async submitProblem(req, res) {
        const { language, code, problemId } = req.body;
        const response = await this._submitProblemUsecase.execute({
            language,
            solution: code,
            problemId,
            accountId: req.user?.accountId,
        });
        res
            .status(index_1.HTTP_STATUS.OK)
            .json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.SUBMIT_PROBLEM, response));
    }
    async getProblemUpdate(req, res) {
        const { id } = req.params;
        const { language } = req.query;
        const response = await this._getProblemUpdatesUsecase.execute({
            language: language,
            problemId: id,
            accountId: req.user?.accountId,
        });
        res
            .status(index_1.HTTP_STATUS.OK)
            .json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.SUBMIT_PROBLEM, response));
    }
};
exports.UserProblemController = UserProblemController;
exports.UserProblemController = UserProblemController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IUserGetAllProblemsUsecase')),
    __param(1, (0, tsyringe_1.inject)('IUserGetProblemUsecase')),
    __param(2, (0, tsyringe_1.inject)('IRunProblemUsecase')),
    __param(3, (0, tsyringe_1.inject)('ISubmitProblemUsecase')),
    __param(4, (0, tsyringe_1.inject)('IGetProblemUpdatesUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], UserProblemController);
//# sourceMappingURL=user-problem.controller.js.map