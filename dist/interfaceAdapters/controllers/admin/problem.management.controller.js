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
exports.ProblemManagementController = void 0;
const tsyringe_1 = require("tsyringe");
const schema_1 = require("./validation/schema");
const index_1 = require("../auth/index");
const constant_1 = require("../../../shared/constant");
let ProblemManagementController = class ProblemManagementController {
    _createProblemUsecase;
    _getAllProblemUsecase;
    _addLanguageUsecase;
    _getLanguageDetailsUsecase;
    _updateLanguageUsecase;
    _addSingleTestcaseUsecase;
    _getAllTestcaseUsecase;
    _deleteTestcaseUsecase;
    _getProblemUsecase;
    _updateProblemUsecase;
    _changeVisibilityUsecase;
    _autoGenerateTestcaseUsecase;
    constructor(_createProblemUsecase, _getAllProblemUsecase, _addLanguageUsecase, _getLanguageDetailsUsecase, _updateLanguageUsecase, _addSingleTestcaseUsecase, _getAllTestcaseUsecase, _deleteTestcaseUsecase, _getProblemUsecase, _updateProblemUsecase, _changeVisibilityUsecase, _autoGenerateTestcaseUsecase) {
        this._createProblemUsecase = _createProblemUsecase;
        this._getAllProblemUsecase = _getAllProblemUsecase;
        this._addLanguageUsecase = _addLanguageUsecase;
        this._getLanguageDetailsUsecase = _getLanguageDetailsUsecase;
        this._updateLanguageUsecase = _updateLanguageUsecase;
        this._addSingleTestcaseUsecase = _addSingleTestcaseUsecase;
        this._getAllTestcaseUsecase = _getAllTestcaseUsecase;
        this._deleteTestcaseUsecase = _deleteTestcaseUsecase;
        this._getProblemUsecase = _getProblemUsecase;
        this._updateProblemUsecase = _updateProblemUsecase;
        this._changeVisibilityUsecase = _changeVisibilityUsecase;
        this._autoGenerateTestcaseUsecase = _autoGenerateTestcaseUsecase;
    }
    async createProblem(req, res) {
        const validatedProblem = schema_1.createProblemSchema.parse(req.body);
        await this._createProblemUsecase.execute(validatedProblem);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.PROBLEM_CREATED));
    }
    async getAllProblems(req, res) {
        const validatedQurey = schema_1.querySchema.parse(req.query);
        const response = await this._getAllProblemUsecase.execute(validatedQurey);
        res
            .status(index_1.HTTP_STATUS.OK)
            .json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.GET_ALL_PROBLEMS, response));
    }
    async addLanguage(req, res) {
        const { language, problemId } = req.body;
        if (!constant_1.LANGUAGES.includes(language)) {
            throw new index_1.CustomError(index_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.LANGUAGE_NOT_AVAILABLE);
        }
        await this._addLanguageUsecase.execute({ language, problemId });
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.LANGUAGE_ADDED));
    }
    async getLanguage(req, res) {
        const { id } = req.params;
        const validated = schema_1.mongoObjectIdSchema.parse({ id });
        const response = await this._getLanguageDetailsUsecase.execute(validated.id);
        res
            .status(index_1.HTTP_STATUS.OK)
            .json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.LANGUAGES_FETCHED, response));
    }
    async updateLanguage(req, res) {
        const validatedLangauge = schema_1.languageRequestSchema.parse(req.body);
        await this._updateLanguageUsecase.execute(validatedLangauge);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.LANGUAGE_UPDATED));
    }
    async addSingleTestcase(req, res) {
        const { input, output, problemId, example } = req.body;
        const validated = schema_1.testcaseSchema.parse({
            input,
            output,
            problemId,
            example,
        });
        const response = await this._addSingleTestcaseUsecase.execute(validated);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(response.isAllPassed, index_1.SUCCESS_MESSAGES.SINGLE_TESTCASE_VALIDATED, response.passedLanguages));
    }
    async getAllTestcases(req, res) {
        const { id } = req.params;
        const validated = schema_1.mongoObjectIdSchema.parse({ id });
        const response = await this._getAllTestcaseUsecase.execute(validated.id);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.GET_TESTCASES, response));
    }
    async deleteTestcase(req, res) {
        const { id } = req.params;
        const validated = schema_1.mongoObjectIdSchema.parse({ id });
        await this._deleteTestcaseUsecase.execute(validated.id);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.TESTCASE_DELETED));
    }
    async getProblem(req, res) {
        const { id } = req.params;
        const validated = schema_1.mongoObjectIdSchema.parse({ id });
        const response = await this._getProblemUsecase.execute(validated.id);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.GET_PROBLEM, response));
    }
    async updateProblem(req, res) {
        const validatedProblem = schema_1.updateProblemSchema.parse(req.body);
        await this._updateProblemUsecase.execute(validatedProblem);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.PROBLEM_UPDATED));
    }
    async changeVisibility(req, res) {
        const validated = schema_1.mongoObjectIdSchema.parse({ id: req.body.id });
        await this._changeVisibilityUsecase.execute(validated.id);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.VISIBILITY_CHANGED));
    }
    async autoGenerateTestcases(req, res) {
        const { problemId } = req.body;
        await this._autoGenerateTestcaseUsecase.executes(problemId);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.TEST_CASE_AUTO_GENERATE));
    }
};
exports.ProblemManagementController = ProblemManagementController;
exports.ProblemManagementController = ProblemManagementController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('ICreateProblemUsecase')),
    __param(1, (0, tsyringe_1.inject)('IGetAllProblemsUsecase')),
    __param(2, (0, tsyringe_1.inject)('IAddLanguageUsecase')),
    __param(3, (0, tsyringe_1.inject)('IGetLanguageDetailsUsecase')),
    __param(4, (0, tsyringe_1.inject)('IUpdateLanguageUsecase')),
    __param(5, (0, tsyringe_1.inject)('IAddSingleTestcaseUsecase')),
    __param(6, (0, tsyringe_1.inject)('IGetAllTestcaseUsecase')),
    __param(7, (0, tsyringe_1.inject)('IDeleteTestcaseUsecase')),
    __param(8, (0, tsyringe_1.inject)('IGetProblemUsecase')),
    __param(9, (0, tsyringe_1.inject)('IUpdateProblemUsecase')),
    __param(10, (0, tsyringe_1.inject)('IChangeVisibilityUsecase')),
    __param(11, (0, tsyringe_1.inject)('IAutoGenerateTestcasesUsecasse')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], ProblemManagementController);
//# sourceMappingURL=problem.management.controller.js.map