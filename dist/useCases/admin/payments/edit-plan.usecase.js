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
exports.EditPlanUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
let EditPlanUseCase = class EditPlanUseCase {
    _planRepository;
    constructor(_planRepository) {
        this._planRepository = _planRepository;
    }
    async execute(data) {
        const plan = await this._planRepository.findById(data.id);
        if (!plan) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.PLAN_NOT_FOUND);
        }
        await this._planRepository.updateById(data.id, {
            price: Number(data.price),
            name: data.name
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
                .trim(),
            description: data.description.trim(),
            features: data.features,
        });
    }
};
exports.EditPlanUseCase = EditPlanUseCase;
exports.EditPlanUseCase = EditPlanUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IPlanRepository')),
    __metadata("design:paramtypes", [Object])
], EditPlanUseCase);
//# sourceMappingURL=edit-plan.usecase.js.map