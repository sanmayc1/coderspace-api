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
exports.UserGetProblemUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const mappers_1 = require("../../dtos/mappers/mappers");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
let UserGetProblemUsecase = class UserGetProblemUsecase {
    _problemRepository;
    _testcaseRepository;
    constructor(_problemRepository, _testcaseRepository) {
        this._problemRepository = _problemRepository;
        this._testcaseRepository = _testcaseRepository;
    }
    async execute(id) {
        const relations = ['skillsIds', 'addedLanguagesId', 'domainId'];
        const problem = await this._problemRepository.getProblem(id, { relations });
        const testcases = await this._testcaseRepository.getTestcasesByProblemId(id, { limit: 3 });
        if (!problem) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.PROBLEM_NOT_FOUND);
        }
        return mappers_1.userGetProblemUsecaseMapper.toResponse(problem, testcases);
    }
};
exports.UserGetProblemUsecase = UserGetProblemUsecase;
exports.UserGetProblemUsecase = UserGetProblemUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IProblemRepository')),
    __param(1, (0, tsyringe_1.inject)('ITestcaseRepository')),
    __metadata("design:paramtypes", [Object, Object])
], UserGetProblemUsecase);
//# sourceMappingURL=user-get-problem.usecase.js.map