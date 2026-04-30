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
exports.GetAllTestcaseUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const mappers_1 = require("../../dtos/mappers/mappers");
let GetAllTestcaseUsecase = class GetAllTestcaseUsecase {
    _testcaseRepository;
    constructor(_testcaseRepository) {
        this._testcaseRepository = _testcaseRepository;
    }
    async execute(problemId) {
        const testcases = await this._testcaseRepository.getTestcasesByProblemId(problemId);
        return testcases.map((t) => mappers_1.getAllTestcaseUsecaseMapper.toRespone(t));
    }
};
exports.GetAllTestcaseUsecase = GetAllTestcaseUsecase;
exports.GetAllTestcaseUsecase = GetAllTestcaseUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('ITestcaseRepository')),
    __metadata("design:paramtypes", [Object])
], GetAllTestcaseUsecase);
//# sourceMappingURL=get-all-testcase.usecase.js.map