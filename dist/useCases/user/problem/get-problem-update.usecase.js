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
exports.GetProblemUpdatesUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
let GetProblemUpdatesUsecase = class GetProblemUpdatesUsecase {
    _userRepository;
    _submitProblemRepository;
    constructor(_userRepository, _submitProblemRepository) {
        this._userRepository = _userRepository;
        this._submitProblemRepository = _submitProblemRepository;
    }
    async execute(data) {
        const user = await this._userRepository.findByAccountId(data.accountId);
        if (!user) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.USER_NOT_FOUND);
        }
        const submitProblem = await this._submitProblemRepository.getAllSubmissionByProblemIdAndUserId(data.problemId, user._id);
        if (submitProblem.length === 0) {
            return {
                status: "",
                solution: "",
                language: data.language
            };
        }
        const solvedExist = submitProblem.find((item) => item.status === 'solved');
        if (solvedExist) {
            return {
                status: "solved",
                solution: solvedExist.solution,
                language: solvedExist.language
            };
        }
        return {
            status: submitProblem[submitProblem.length - 1].status,
            solution: submitProblem[submitProblem.length - 1].solution,
            language: submitProblem[submitProblem.length - 1].language
        };
    }
};
exports.GetProblemUpdatesUsecase = GetProblemUpdatesUsecase;
exports.GetProblemUpdatesUsecase = GetProblemUpdatesUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IUserRepository')),
    __param(1, (0, tsyringe_1.inject)('ISubmitProblemRepository')),
    __metadata("design:paramtypes", [Object, Object])
], GetProblemUpdatesUsecase);
//# sourceMappingURL=get-problem-update.usecase.js.map