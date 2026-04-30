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
exports.CompanyController = void 0;
const tsyringe_1 = require("tsyringe");
const index_1 = require("../auth/index");
let CompanyController = class CompanyController {
    _getCompanyUsecase;
    _updateCompanyUsecase;
    _getDashboardUsecase;
    constructor(_getCompanyUsecase, _updateCompanyUsecase, _getDashboardUsecase) {
        this._getCompanyUsecase = _getCompanyUsecase;
        this._updateCompanyUsecase = _updateCompanyUsecase;
        this._getDashboardUsecase = _getDashboardUsecase;
    }
    async getCompany(req, res) {
        const accountId = req.user?.accountId;
        const response = await this._getCompanyUsecase.execute(accountId);
        res
            .status(index_1.HTTP_STATUS.OK)
            .json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.COMPANY_FETCHED, response));
    }
    async updateProfile(req, res) {
        const accountId = req.user?.accountId;
        const { companyName } = req.body;
        await this._updateCompanyUsecase.execute(accountId, companyName);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.COMPANY_UPDATED));
    }
    async getDashboard(req, res) {
        const accountId = req.user?.accountId;
        const response = await this._getDashboardUsecase.execute(accountId);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.DASHBOARD_FETCHED, response));
    }
};
exports.CompanyController = CompanyController;
exports.CompanyController = CompanyController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IGetCompanyUsecase')),
    __param(1, (0, tsyringe_1.inject)('IUpdateCompanyUsecase')),
    __param(2, (0, tsyringe_1.inject)('IGetDashboardUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object])
], CompanyController);
//# sourceMappingURL=company.controller.js.map