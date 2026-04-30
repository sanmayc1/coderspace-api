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
exports.SubmitProblemUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const constant_1 = require("../../../shared/constant");
const custom_error_1 = require("../../../domain/utils/custom-error");
const helper_1 = require("../../../shared/utils/helper");
const testCodeGenerator_1 = require("../../../shared/testCodeGenerator");
let SubmitProblemUsecase = class SubmitProblemUsecase {
    _compilerService;
    _problemRepository;
    _testcaseRepository;
    _userRepository;
    _submitProblemRepository;
    _notificationRepository;
    constructor(_compilerService, _problemRepository, _testcaseRepository, _userRepository, _submitProblemRepository, _notificationRepository) {
        this._compilerService = _compilerService;
        this._problemRepository = _problemRepository;
        this._testcaseRepository = _testcaseRepository;
        this._userRepository = _userRepository;
        this._submitProblemRepository = _submitProblemRepository;
        this._notificationRepository = _notificationRepository;
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
        let levelReached = user.level;
        let badgeReached = user.badge;
        let xpCoinEarned = 0;
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
            const isCorrect = validator((0, helper_1.normalizeMongoOutput)(testcases[i].output), normalizedOutput);
            if (!isCorrect) {
                results.push({
                    input: JSON.parse(testcases[i].input)
                        .map((arg, i) => `param${i + 1} = ${JSON.stringify(arg)}`)
                        .join(',  '),
                    output: normalizedOutput,
                    expected: (0, helper_1.normalizeMongoOutput)(testcases[i].output),
                    isCorrect: false,
                });
                allTestCasePassed = false;
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
        if (!allTestCasePassed) {
            await this._submitProblemRepository.create({
                problemId: data.problemId,
                userId: user._id,
                language: data.language,
                solution: data.solution,
                status: 'attempted',
            });
        }
        else {
            const submissions = await this._submitProblemRepository.getAllSubmissionByProblemIdAndUserId(data.problemId, user._id);
            const previouslySolved = submissions.find((s) => s.status === 'solved');
            await this._submitProblemRepository.create({
                problemId: data.problemId,
                userId: user._id,
                language: data.language,
                solution: data.solution,
                status: 'solved',
            });
            if (!previouslySolved) {
                const newGlobalScore = user?.globalScore + constant_1.SCORES[problem.difficulty] * 10;
                const newXpCoin = user?.xpCoin + constant_1.SCORES[problem.difficulty] * 10;
                const newLevel = Math.min(100, Math.floor(newGlobalScore / 10));
                const newBadge = newLevel >= 50 ? 'gold' : newLevel === 100 ? 'platinum' : 'silver';
                if (newLevel > levelReached) {
                    levelReached = newLevel;
                    await this._notificationRepository.create({
                        accountId: data.accountId,
                        title: 'Level Up',
                        message: `Congratulations! You have reached level ${newLevel}`,
                        type: 'level_up',
                        isRead: false,
                    });
                }
                if (newBadge !== badgeReached) {
                    badgeReached = newBadge;
                    await this._notificationRepository.create({
                        accountId: data.accountId,
                        title: 'Badge Unlocked',
                        message: `Congratulations! You have unlocked ${newBadge} badge`,
                        type: 'badge_unlocked',
                        isRead: false,
                    });
                }
                xpCoinEarned = constant_1.SCORES[problem.difficulty] * 10;
                await this._userRepository.updateById(user._id, {
                    globalScore: newGlobalScore,
                    xpCoin: newXpCoin,
                    level: newLevel,
                    ...(newBadge !== user.badge && { badge: newBadge }),
                });
            }
        }
        return {
            testcases: results,
            success: allTestCasePassed,
            levelReached,
            badgeReached,
            xpCoinEarned,
        };
    }
};
exports.SubmitProblemUsecase = SubmitProblemUsecase;
exports.SubmitProblemUsecase = SubmitProblemUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('ICompilerService')),
    __param(1, (0, tsyringe_1.inject)('IProblemRepository')),
    __param(2, (0, tsyringe_1.inject)('ITestcaseRepository')),
    __param(3, (0, tsyringe_1.inject)('IUserRepository')),
    __param(4, (0, tsyringe_1.inject)('ISubmitProblemRepository')),
    __param(5, (0, tsyringe_1.inject)('INotificationRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], SubmitProblemUsecase);
//# sourceMappingURL=sumbit-problem.usecase.js.map