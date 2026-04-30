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
exports.UserContestController = void 0;
const tsyringe_1 = require("tsyringe");
const auth_1 = require("../auth");
let UserContestController = class UserContestController {
    _getAllUpcomingContestsUsecase;
    _getAllPastContestsUsecase;
    _getContestProblemsUsecase;
    _contestProblemSubmitUsecase;
    _joinContestUsecase;
    _finishContestUsecase;
    constructor(_getAllUpcomingContestsUsecase, _getAllPastContestsUsecase, _getContestProblemsUsecase, _contestProblemSubmitUsecase, _joinContestUsecase, _finishContestUsecase
    // @inject('IGetContestLeaderboardUsecase')
    // private _getContestLeaderboardUsecase: IGetContestLeaderboardUsecase
    ) {
        this._getAllUpcomingContestsUsecase = _getAllUpcomingContestsUsecase;
        this._getAllPastContestsUsecase = _getAllPastContestsUsecase;
        this._getContestProblemsUsecase = _getContestProblemsUsecase;
        this._contestProblemSubmitUsecase = _contestProblemSubmitUsecase;
        this._joinContestUsecase = _joinContestUsecase;
        this._finishContestUsecase = _finishContestUsecase;
    }
    async getAllUpcomingAndOngoingContests(req, res) {
        const { page } = req.query;
        const currentPage = Number(page);
        if (isNaN(currentPage)) {
            throw new auth_1.CustomError(auth_1.HTTP_STATUS.BAD_REQUEST, auth_1.ERROR_MESSAGES.PAGE_NOT_NUMBER);
        }
        const response = await this._getAllUpcomingContestsUsecase.execute(currentPage);
        res
            .status(auth_1.HTTP_STATUS.OK)
            .json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.CONTESTS_FETCHED, response));
    }
    async getAllPastContests(req, res) {
        const { page } = req.query;
        const currentPage = Number(page);
        if (isNaN(currentPage)) {
            throw new auth_1.CustomError(auth_1.HTTP_STATUS.BAD_REQUEST, auth_1.ERROR_MESSAGES.PAGE_NOT_NUMBER);
        }
        const response = await this._getAllPastContestsUsecase.execute(currentPage);
        res
            .status(auth_1.HTTP_STATUS.OK)
            .json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.CONTESTS_FETCHED, response));
    }
    async getContestProblems(req, res) {
        const { id } = req.params;
        const response = await this._getContestProblemsUsecase.execute(id);
        res
            .status(auth_1.HTTP_STATUS.OK)
            .json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.CONTEST_PROBLEMS_FETCHED, response));
    }
    async submitProblem(req, res) {
        const { language, code, problemId, contestId } = req.body;
        const response = await this._contestProblemSubmitUsecase.execute({
            language,
            solution: code,
            problemId,
            contestId,
            accountId: req.user?.accountId,
        });
        res
            .status(auth_1.HTTP_STATUS.OK)
            .json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.CONTEST_PROBLEMS_FETCHED, response));
    }
    async joinContest(req, res) {
        const { contestId } = req.body;
        await this._joinContestUsecase.execute(contestId, req.user?.accountId);
        res.status(auth_1.HTTP_STATUS.OK).json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.CONTEST_JOINED));
    }
    async finishContest(req, res) {
        const { contestId } = req.body;
        await this._finishContestUsecase.execute(contestId, req.user?.accountId);
        res.status(auth_1.HTTP_STATUS.OK).json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.CONTEST_FINISHED));
    }
};
exports.UserContestController = UserContestController;
exports.UserContestController = UserContestController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IGetAllUpcomingAndOngoingContestUseCase')),
    __param(1, (0, tsyringe_1.inject)('IGetAllPastContestUsecase')),
    __param(2, (0, tsyringe_1.inject)('IGetContestProblemsUsecase')),
    __param(3, (0, tsyringe_1.inject)('IContestProblemSubmitUsecase')),
    __param(4, (0, tsyringe_1.inject)('IJoinContestUsecase')),
    __param(5, (0, tsyringe_1.inject)('IFinishContestUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], UserContestController);
//# sourceMappingURL=contest.controller.js.map