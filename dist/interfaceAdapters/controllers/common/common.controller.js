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
exports.CommonController = void 0;
const tsyringe_1 = require("tsyringe");
const index_1 = require("../auth/index");
let CommonController = class CommonController {
    _getAllSkillsUsecase;
    _getContestLeaderboardUsecase;
    _changeAccountPasswordUsecase;
    constructor(_getAllSkillsUsecase, _getContestLeaderboardUsecase, _changeAccountPasswordUsecase) {
        this._getAllSkillsUsecase = _getAllSkillsUsecase;
        this._getContestLeaderboardUsecase = _getContestLeaderboardUsecase;
        this._changeAccountPasswordUsecase = _changeAccountPasswordUsecase;
    }
    async getAllSkills(req, res) {
        const response = await this._getAllSkillsUsecase.executes();
        res
            .status(index_1.HTTP_STATUS.OK)
            .json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.GET_ALL_SKILLS, response));
    }
    async getContestLeaderboard(req, res) {
        const { id } = req.params;
        const { page, search } = req.query;
        const currentPage = Number(page);
        if (isNaN(currentPage)) {
            throw new index_1.CustomError(index_1.HTTP_STATUS.BAD_REQUEST, index_1.ERROR_MESSAGES.PAGE_NOT_NUMBER);
        }
        const response = await this._getContestLeaderboardUsecase.execute(id, currentPage, search || '');
        res
            .status(index_1.HTTP_STATUS.OK)
            .json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.CONTEST_LEADERBOARD_FETCHED, response));
    }
    async changeAccountPassword(req, res) {
        const response = await this._changeAccountPasswordUsecase.execute({
            ...req.body,
            accountId: req?.user?.accountId,
        });
        res
            .status(index_1.HTTP_STATUS.OK)
            .json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.ACCOUNT_PASSWORD_CHANGED, response));
    }
};
exports.CommonController = CommonController;
exports.CommonController = CommonController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IGetAllSkillsUsecase')),
    __param(1, (0, tsyringe_1.inject)('IGetContestLeaderboardUsecase')),
    __param(2, (0, tsyringe_1.inject)('IChangeAccountPasswordUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object])
], CommonController);
//# sourceMappingURL=common.controller.js.map