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
exports.ContestProblemSubmitUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const constant_1 = require("../../../shared/constant");
const custom_error_1 = require("../../../domain/utils/custom-error");
const testCodeGenerator_1 = require("../../../shared/testCodeGenerator");
const helper_1 = require("../../../shared/utils/helper");
const helper_2 = require("../../../shared/utils/helper");
let ContestProblemSubmitUsecase = class ContestProblemSubmitUsecase {
    _compilerService;
    _problemRepository;
    _testcaseRepository;
    _userRepository;
    _contestAttemptRepository;
    _contestRepository;
    constructor(_compilerService, _problemRepository, _testcaseRepository, _userRepository, _contestAttemptRepository, _contestRepository) {
        this._compilerService = _compilerService;
        this._problemRepository = _problemRepository;
        this._testcaseRepository = _testcaseRepository;
        this._userRepository = _userRepository;
        this._contestAttemptRepository = _contestAttemptRepository;
        this._contestRepository = _contestRepository;
    }
    async execute(data) {
        const selectedLanguage = constant_1.availableLanguages[data.language];
        if (!selectedLanguage) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.INVALID_LANGUAGE);
        }
        const problem = await this._problemRepository.getProblem(data.problemId, {
            relations: ['addedLanguagesId'],
        });
        if (!problem) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.PROBLEM_NOT_FOUND);
        }
        const selectedLanguageExist = (problem?.addedLanguagesId).find((lang) => lang.language === data.language);
        if (!selectedLanguageExist) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.INVALID_LANGUAGE);
        }
        const user = await this._userRepository.findByAccountId(data.accountId);
        if (!user) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.USER_NOT_FOUND);
        }
        const testcases = await this._testcaseRepository.getTestcasesByProblemId(data.problemId);
        const validator = constant_1.VALIDATORS[problem.validatorType];
        const testCodeGenerator = testCodeGenerator_1.testCodeGenerators[selectedLanguage.name];
        let results = [];
        let allTestCasePassed = true;
        for (let i = 0; i < testcases.length; i++) {
            const testCode = testCodeGenerator(testcases[i], data.solution, selectedLanguageExist.functionName);
            const result = await this._compilerService.runCode(testCode, selectedLanguage.name, selectedLanguage.version, selectedLanguage.extension);
            if (result.stderr) {
                throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, result.stderr);
            }
            if (result.status !== null) {
                throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, String(result.output));
            }
            const normalizedOutput = (0, helper_1.normalize)(result.stdout);
            const isCorrect = validator((0, helper_2.normalizeMongoOutput)(testcases[i].output), normalizedOutput);
            if (!isCorrect) {
                allTestCasePassed = false;
                results.push({
                    input: JSON.parse(testcases[i].input)
                        .map((arg, i) => `param${i + 1} = ${JSON.stringify(arg)}`)
                        .join(',  '),
                    output: normalizedOutput,
                    expected: (0, helper_2.normalizeMongoOutput)(testcases[i].output),
                    isCorrect: false,
                });
            }
            else {
                results.push({
                    input: JSON.parse(testcases[i].input)
                        .map((arg, i) => `param${i + 1} = ${JSON.stringify(arg)}`)
                        .join(',  '),
                    output: normalizedOutput,
                    expected: (0, helper_2.normalizeMongoOutput)(testcases[i].output),
                    isCorrect: true,
                });
            }
        }
        if (allTestCasePassed) {
            results = results.slice(0, 3);
        }
        else {
            const failedTestCases = results.slice(3).filter((result) => !result.isCorrect);
            results = results.slice(0, 3);
            if (failedTestCases.length > 0) {
                results = [
                    ...results,
                    failedTestCases.pop(),
                ];
            }
        }
        const contest = await this._contestRepository.findById(data.contestId);
        if (!contest) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.CONTEST_NOT_FOUND);
        }
        const contestAttempt = await this._contestAttemptRepository.getContestByUserIdAndContestId(user._id, contest._id);
        if (!contestAttempt) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.CONTEST_ATTEMPT_NOT_FOUND);
        }
        if (!allTestCasePassed) {
            await this._contestAttemptRepository.updateContestByUserIdAndContestId(user._id, contest._id, {
                contestId: contest._id,
                userId: user._id,
                totalProblems: contest.problemsIds.length,
                totalSubmissions: contestAttempt?.totalSubmissions + 1,
                endDateAndTime: new Date(),
            });
        }
        else {
            const score = contest.problemsIds.length * constant_1.CONTEST_SCORE_BASED_ON_DIFFICULTY[problem.difficulty] +
                contestAttempt?.score;
            await this._contestAttemptRepository.updateContestByUserIdAndContestId(user._id, contest._id, {
                contestId: contest._id,
                userId: user._id,
                totalProblems: contest.problemsIds.length,
                totalSubmissions: contestAttempt?.totalSubmissions + 1,
                endDateAndTime: new Date(),
                score: score,
                solvedProblems: contestAttempt?.solvedProblems + 1,
            });
        }
        return {
            testcases: results,
            success: allTestCasePassed,
        };
    }
};
exports.ContestProblemSubmitUsecase = ContestProblemSubmitUsecase;
exports.ContestProblemSubmitUsecase = ContestProblemSubmitUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('ICompilerService')),
    __param(1, (0, tsyringe_1.inject)('IProblemRepository')),
    __param(2, (0, tsyringe_1.inject)('ITestcaseRepository')),
    __param(3, (0, tsyringe_1.inject)('IUserRepository')),
    __param(4, (0, tsyringe_1.inject)('IContestAttemptRepository')),
    __param(5, (0, tsyringe_1.inject)('IContestRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], ContestProblemSubmitUsecase);
//# sourceMappingURL=contest-problem-submit.usecase.js.map