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
exports.UpdateUserUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
let UpdateUserUsecase = class UpdateUserUsecase {
    _userRepository;
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute(data) {
        const user = await this._userRepository.findById(data.userId);
        if (!user) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.USER_NOT_FOUND);
        }
        let finalLevel = data.level ?? user.level;
        let finalBadge = (data.badge ?? user.badge);
        if (data.badge !== user.badge) {
            if (finalBadge === 'silver' && finalLevel >= 50) {
                finalLevel = 1;
            }
            if (finalBadge === 'gold' && (finalLevel < 50 || finalLevel === 100)) {
                finalLevel = 50;
            }
            if (finalBadge === 'platinum') {
                finalLevel = 100;
            }
        }
        if (data.level !== user.level) {
            if (finalLevel >= 100)
                finalBadge = 'platinum';
            else if (finalLevel >= 50)
                finalBadge = 'gold';
            else
                finalBadge = 'silver';
        }
        if (finalLevel === user.level && finalBadge === user.badge) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.UPTODATE);
        }
        await this._userRepository.updateById(data.userId, {
            level: finalLevel,
            badge: finalBadge,
        });
    }
};
exports.UpdateUserUsecase = UpdateUserUsecase;
exports.UpdateUserUsecase = UpdateUserUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object])
], UpdateUserUsecase);
//# sourceMappingURL=update-user.usecase.js.map