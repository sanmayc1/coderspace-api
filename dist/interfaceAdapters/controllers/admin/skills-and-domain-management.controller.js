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
exports.SkillAndDomainManagementController = void 0;
const tsyringe_1 = require("tsyringe");
const index_1 = require("../auth/index");
let SkillAndDomainManagementController = class SkillAndDomainManagementController {
    _createDomainUsecase;
    _getAllDomainsUsecase;
    _deleteDomainUsecase;
    _deleteSkillUsecase;
    _createSkillUsecase;
    constructor(_createDomainUsecase, _getAllDomainsUsecase, _deleteDomainUsecase, _deleteSkillUsecase, _createSkillUsecase) {
        this._createDomainUsecase = _createDomainUsecase;
        this._getAllDomainsUsecase = _getAllDomainsUsecase;
        this._deleteDomainUsecase = _deleteDomainUsecase;
        this._deleteSkillUsecase = _deleteSkillUsecase;
        this._createSkillUsecase = _createSkillUsecase;
    }
    async createDomain(req, res) {
        const { title } = req.body;
        await this._createDomainUsecase.execute(title);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.DOMAIN_CREATED));
    }
    async getAllDomains(req, res) {
        const response = await this._getAllDomainsUsecase.executes();
        res
            .status(index_1.HTTP_STATUS.OK)
            .json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.GET_ALL_DOMAINS, response));
    }
    async deleteDomain(req, res) {
        const { id } = req.params;
        if (!id.trim()) {
            throw new index_1.CustomError(index_1.HTTP_STATUS.BAD_REQUEST, index_1.ERROR_MESSAGES.DOMAIN_NOT_FOUND);
        }
        await this._deleteDomainUsecase.execute(id);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.DOMAIN_DELETED));
    }
    async createSkill(req, res) {
        const { title } = req.body;
        await this._createSkillUsecase.execute(title);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.SKILL_CREATED));
    }
    async deleteSkill(req, res) {
        const { id } = req.params;
        if (!id.trim()) {
            throw new index_1.CustomError(index_1.HTTP_STATUS.BAD_REQUEST, index_1.ERROR_MESSAGES.DOMAIN_NOT_FOUND);
        }
        await this._deleteSkillUsecase.execute(id);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.SKILL_DELETED));
    }
};
exports.SkillAndDomainManagementController = SkillAndDomainManagementController;
exports.SkillAndDomainManagementController = SkillAndDomainManagementController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('ICreateDomainUsecase')),
    __param(1, (0, tsyringe_1.inject)('IGetAllDomains')),
    __param(2, (0, tsyringe_1.inject)('IDeleteDomainUsecase')),
    __param(3, (0, tsyringe_1.inject)('IDeleteSkillUsecase')),
    __param(4, (0, tsyringe_1.inject)('ICreateSkillUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], SkillAndDomainManagementController);
//# sourceMappingURL=skills-and-domain-management.controller.js.map