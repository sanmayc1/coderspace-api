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
exports.AddSingleTestcaseUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const tsyringe_2 = require("tsyringe");
const helper_1 = require("../../../shared/utils/helper");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
const testCodeGenerator_1 = require("../../../shared/testCodeGenerator");
let AddSingleTestcaseUsecase = class AddSingleTestcaseUsecase {
    _testcaseRepository;
    _problemRepository;
    _compilerService;
    constructor(_testcaseRepository, _problemRepository, _compilerService) {
        this._testcaseRepository = _testcaseRepository;
        this._problemRepository = _problemRepository;
        this._compilerService = _compilerService;
    }
    async execute(input) {
        const allTestcase = await this._testcaseRepository.getTestcasesByProblemId(input.problemId);
        for (const testcase of allTestcase) {
            if ((0, helper_1.normalizeMongoOutput)(testcase.input) === (0, helper_1.normalize)(input.input) &&
                (0, helper_1.normalizeMongoOutput)(testcase.output) === (0, helper_1.normalize)(input.output)) {
                throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.TESTCASE_ALREADY_EXISTS);
            }
        }
        const problem = await this._problemRepository.getProblem(input.problemId, {
            relations: ['addedLanguagesId'],
        });
        if (!problem) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.PROBLEM_NOT_FOUND);
        }
        if (problem.addedLanguagesId.length === 0) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.NO_LANGUAGE_ADDED_TO_PROBLEM);
        }
        const validator = constant_1.VALIDATORS[problem.validatorType];
        const passedLanguages = [];
        for (let i = 0; i < problem.addedLanguagesId.length; i++) {
            const selectedLanguageExist = problem.addedLanguagesId[i];
            const selectedLanguage = constant_1.availableLanguages[selectedLanguageExist?.language];
            const testCodeGenerator = testCodeGenerator_1.testCodeGenerators[selectedLanguage?.name];
            const testCode = testCodeGenerator(input, selectedLanguageExist?.solution, selectedLanguageExist?.functionName);
            const result = await this._compilerService.runCode(testCode, selectedLanguage?.name, selectedLanguage?.version, selectedLanguage?.extension);
            if (result.stderr) {
                passedLanguages.push({ language: selectedLanguageExist.language, isPassed: false });
                continue;
            }
            if (result.status !== null) {
                passedLanguages.push({ language: selectedLanguageExist.language, isPassed: false });
                continue;
            }
            const normalizedOutput = (0, helper_1.normalize)(result.stdout);
            const isCorrect = validator((0, helper_1.normalizeMongoOutput)(input.output), normalizedOutput);
            if (!isCorrect) {
                passedLanguages.push({ language: selectedLanguageExist.language, isPassed: false });
            }
            else {
                passedLanguages.push({ language: selectedLanguageExist.language, isPassed: true });
            }
        }
        const isAllPassed = passedLanguages.every((item) => item.isPassed);
        if (!isAllPassed) {
            return {
                isAllPassed,
                passedLanguages,
            };
        }
        await this._testcaseRepository.create({
            ...input,
            ...(input.example ? { example: true } : { example: false }),
        });
        return {
            isAllPassed,
            passedLanguages,
        };
    }
};
exports.AddSingleTestcaseUsecase = AddSingleTestcaseUsecase;
exports.AddSingleTestcaseUsecase = AddSingleTestcaseUsecase = __decorate([
    (0, tsyringe_2.injectable)(),
    __param(0, (0, tsyringe_1.inject)('ITestcaseRepository')),
    __param(1, (0, tsyringe_1.inject)('IProblemRepository')),
    __param(2, (0, tsyringe_1.inject)('ICompilerService')),
    __metadata("design:paramtypes", [Object, Object, Object])
], AddSingleTestcaseUsecase);
//# sourceMappingURL=add-single-testcase.usecase.js.map