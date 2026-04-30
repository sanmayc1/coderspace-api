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
exports.RunProblemUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const constant_1 = require("../../../shared/constant");
const custom_error_1 = require("../../../domain/utils/custom-error");
const helper_1 = require("../../../shared/utils/helper");
const testCodeGenerator_1 = require("../../../shared/testCodeGenerator");
let RunProblemUsecase = class RunProblemUsecase {
    _compilerService;
    _problemRepository;
    _testcaseRepository;
    constructor(_compilerService, _problemRepository, _testcaseRepository) {
        this._compilerService = _compilerService;
        this._problemRepository = _problemRepository;
        this._testcaseRepository = _testcaseRepository;
    }
    async execute(language, code, problemId) {
        const selectedLanguage = constant_1.availableLanguages[language];
        if (!selectedLanguage) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.INVALID_LANGUAGE);
        }
        const problem = await this._problemRepository.getProblem(problemId, {
            relations: ['addedLanguagesId'],
        });
        if (!problem) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.PROBLEM_NOT_FOUND);
        }
        const selectedLanguageExist = (problem?.addedLanguagesId).find((lang) => lang.language === language);
        if (!selectedLanguageExist) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.INVALID_LANGUAGE);
        }
        const testcases = await this._testcaseRepository.getTestcasesByProblemId(problemId);
        const length = testcases.length < 3 ? testcases.length : 3;
        const validator = constant_1.VALIDATORS[problem.validatorType];
        const testCodeGenerator = testCodeGenerator_1.testCodeGenerators[selectedLanguage.name];
        const results = [];
        let allTestCasePassed = true;
        for (let i = 0; i < length; i++) {
            const testCode = testCodeGenerator(testcases[i], code, selectedLanguageExist.functionName);
            const result = await this._compilerService.runCode(testCode, selectedLanguage.name, selectedLanguage.version, selectedLanguage.extension);
            if (result.stderr) {
                throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, result.stderr);
            }
            if (result.status !== null) {
                throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, String(result.output));
            }
            const normalizedOutput = (0, helper_1.normalize)(result.stdout);
            const isCorrect = validator((0, helper_1.normalizeMongoOutput)(testcases[i].output), normalizedOutput);
            if (!isCorrect) {
                allTestCasePassed = false;
                results.push({
                    input: JSON.parse(testcases[i].input)
                        .map((arg, i) => `param${i + 1} = ${JSON.stringify(arg)}`)
                        .join(',  '),
                    output: normalizedOutput,
                    expected: (0, helper_1.normalizeMongoOutput)(testcases[i].output),
                    isCorrect: false,
                });
            }
            else {
                results.push({
                    input: JSON.parse(testcases[i].input)
                        .map((arg, i) => `param${i + 1} = ${JSON.stringify(arg)}`)
                        .join(',  '),
                    output: normalizedOutput,
                    expected: (0, helper_1.normalizeMongoOutput)(testcases[i].output),
                    isCorrect: true,
                });
            }
        }
        return {
            testcases: results,
            success: allTestCasePassed,
        };
    }
};
exports.RunProblemUsecase = RunProblemUsecase;
exports.RunProblemUsecase = RunProblemUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('ICompilerService')),
    __param(1, (0, tsyringe_1.inject)('IProblemRepository')),
    __param(2, (0, tsyringe_1.inject)('ITestcaseRepository')),
    __metadata("design:paramtypes", [Object, Object, Object])
], RunProblemUsecase);
//# sourceMappingURL=run-problem.usecase.js.map