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
exports.VerifyOtpUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../domain/utils/custom-error");
const constant_1 = require("../../shared/constant");
let VerifyOtpUsecase = class VerifyOtpUsecase {
    _otpService;
    _accountRepository;
    constructor(_otpService, _accountRepository) {
        this._otpService = _otpService;
        this._accountRepository = _accountRepository;
    }
    async execute(email, otp) {
        const otpExist = await this._otpService.otpExists(email);
        if (!otpExist) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.GONE, constant_1.ERROR_MESSAGES.OTP_EXPIRE);
        }
        const isVerified = await this._otpService.verifyOtp(otp, otpExist);
        if (!isVerified) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.INVALID_OTP);
        }
        await this._accountRepository.setAccountVerified(email);
    }
};
exports.VerifyOtpUsecase = VerifyOtpUsecase;
exports.VerifyOtpUsecase = VerifyOtpUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IOtpService')),
    __param(1, (0, tsyringe_1.inject)('IAccountRepository')),
    __metadata("design:paramtypes", [Object, Object])
], VerifyOtpUsecase);
//# sourceMappingURL=verify-otp.usecase.js.map