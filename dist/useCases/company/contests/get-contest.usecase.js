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
exports.GetContestUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
const mappers_1 = require("../../dtos/mappers/mappers");
let GetContestUsecase = class GetContestUsecase {
    _contestRepository;
    constructor(_contestRepository) {
        this._contestRepository = _contestRepository;
    }
    async execute(id) {
        const contest = await this._contestRepository.findById(id);
        if (!contest) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.CONTEST_NOT_FOUND);
        }
        return mappers_1.getContestUsecaseMapper.toResponse(contest);
    }
};
exports.GetContestUsecase = GetContestUsecase;
exports.GetContestUsecase = GetContestUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IContestRepository')),
    __metadata("design:paramtypes", [Object])
], GetContestUsecase);
//# sourceMappingURL=get-contest.usecase.js.map