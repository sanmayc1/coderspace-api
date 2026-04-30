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
exports.RefreshTokenUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../domain/utils/custom-error");
const constant_1 = require("../../shared/constant");
let RefreshTokenUsecase = class RefreshTokenUsecase {
    _jwtService;
    _blacklistRepository;
    constructor(_jwtService, _blacklistRepository) {
        this._jwtService = _jwtService;
        this._blacklistRepository = _blacklistRepository;
    }
    async execute(refreshToken, deviceId) {
        const payload = this._jwtService.verifyRefresh(refreshToken);
        if (payload === null) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.FORBIDDEN, constant_1.ERROR_MESSAGES.TOKEN_EXPIRE);
        }
        const valid = await this._blacklistRepository.find(`blacklist:${refreshToken}`);
        if (valid) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.FORBIDDEN, constant_1.ERROR_MESSAGES.TOKEN_BLACKLIST);
        }
        const newPayload = {
            accountId: payload.accountId,
            isProfileComplete: payload.isProfileComplete,
            role: payload.role,
            deviceId,
        };
        const accessToken = this._jwtService.signAccess(newPayload);
        return accessToken;
    }
};
exports.RefreshTokenUsecase = RefreshTokenUsecase;
exports.RefreshTokenUsecase = RefreshTokenUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IJwtService')),
    __param(1, (0, tsyringe_1.inject)('IBlackListTokenRepository')),
    __metadata("design:paramtypes", [Object, Object])
], RefreshTokenUsecase);
//# sourceMappingURL=refresh-token.usecase.js.map