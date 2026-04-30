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
exports.UpdateContestUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
let UpdateContestUseCase = class UpdateContestUseCase {
    _contestRepository;
    constructor(_contestRepository) {
        this._contestRepository = _contestRepository;
    }
    async execute(data) {
        const contest = await this._contestRepository.findById(data.id);
        if (!contest) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.CONTEST_NOT_FOUND);
        }
        const startTime = new Date(data.dateAndTime); // ISO string
        const durationMinutes = Number(data.duration);
        const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);
        await this._contestRepository.updateById(data.id, {
            title: data.title,
            description: data.description,
            dateAndTime: startTime,
            endDateAndTime: endTime,
            duration: data.duration,
            view: data.visibility,
            domainId: data.domain,
            skillsIds: data.skills,
            problemsIds: data.problems,
            rewards: data.rewards,
        });
    }
};
exports.UpdateContestUseCase = UpdateContestUseCase;
exports.UpdateContestUseCase = UpdateContestUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IContestRepository')),
    __metadata("design:paramtypes", [Object])
], UpdateContestUseCase);
//# sourceMappingURL=update-contest.usecase.js.map