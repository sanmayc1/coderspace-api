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
exports.CompanyContestController = void 0;
const tsyringe_1 = require("tsyringe");
const index_1 = require("../auth/index");
const schema_1 = require("./validation/schema");
let CompanyContestController = class CompanyContestController {
    _createContestUsecase;
    _getAllCompanyContestsUsecase;
    _getContestByIdUsecase;
    _updateContestUseCase;
    _deleteContestUseCase;
    _getAllAvailableProblemsForContestUsecase;
    constructor(_createContestUsecase, _getAllCompanyContestsUsecase, _getContestByIdUsecase, _updateContestUseCase, _deleteContestUseCase, _getAllAvailableProblemsForContestUsecase) {
        this._createContestUsecase = _createContestUsecase;
        this._getAllCompanyContestsUsecase = _getAllCompanyContestsUsecase;
        this._getContestByIdUsecase = _getContestByIdUsecase;
        this._updateContestUseCase = _updateContestUseCase;
        this._deleteContestUseCase = _deleteContestUseCase;
        this._getAllAvailableProblemsForContestUsecase = _getAllAvailableProblemsForContestUsecase;
    }
    async createContest(req, res) {
        const validatedContest = schema_1.createContestSchema.parse(req.body);
        const accountId = req.user?.accountId;
        await this._createContestUsecase.execute(validatedContest, accountId);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.CONTEST_CREATED));
    }
    async getAllContests(req, res) {
        const validatedQuery = schema_1.companyContestQuerySchema.parse(req.query);
        const accountId = req.user?.accountId;
        const response = await this._getAllCompanyContestsUsecase.execute(accountId, validatedQuery);
        res
            .status(index_1.HTTP_STATUS.OK)
            .json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.CONTESTS_FETCHED, response));
    }
    async getContestById(req, res) {
        const { id } = req.params;
        const response = await this._getContestByIdUsecase.execute(id);
        res
            .status(index_1.HTTP_STATUS.OK)
            .json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.CONTEST_FETCHED, response));
    }
    async updateContest(req, res) {
        const validatedContest = schema_1.updateContestSchema.parse(req.body);
        await this._updateContestUseCase.execute(validatedContest);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.CONTEST_UPDATED));
    }
    async deleteContest(req, res) {
        const { id } = req.params;
        await this._deleteContestUseCase.execute(id);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.CONTEST_DELETED));
    }
    async getAllAvailableProblems(req, res) {
        const response = await this._getAllAvailableProblemsForContestUsecase.executes();
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.CONTEST_PROBLEMS_FETCHED, response));
    }
};
exports.CompanyContestController = CompanyContestController;
exports.CompanyContestController = CompanyContestController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('ICreateContestUsecase')),
    __param(1, (0, tsyringe_1.inject)('IGetAllCompanyContestsUsecase')),
    __param(2, (0, tsyringe_1.inject)('IGetContestUsecase')),
    __param(3, (0, tsyringe_1.inject)('IUpdateContestUseCase')),
    __param(4, (0, tsyringe_1.inject)('IDeleteContestUseCase')),
    __param(5, (0, tsyringe_1.inject)('IGetAllAvailableProblemsForContestUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], CompanyContestController);
//# sourceMappingURL=contest.controller.js.map