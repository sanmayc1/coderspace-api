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
exports.SendOtpUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../domain/utils/custom-error");
const constant_1 = require("../../shared/constant");
const email_templates_1 = require("../../shared/email-templates");
let SendOtpUsecase = class SendOtpUsecase {
    _otpService;
    _emailService;
    _accountRepository;
    constructor(_otpService, _emailService, _accountRepository) {
        this._otpService = _otpService;
        this._emailService = _emailService;
        this._accountRepository = _accountRepository;
    }
    async execute(email) {
        const existAccount = await this._accountRepository.findByEmail(email);
        if (!existAccount) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.EMAIL_NOT_EXIST);
        }
        const existUserOtp = await this._otpService.otpExists(email);
        if (existUserOtp) {
            await this._otpService.deleteOtp(email);
        }
        const otp = this._otpService.generateOtp();
        const content = (0, email_templates_1.otpEmailTemplate)(otp);
        this._emailService.sendMail(email, content, 'Your Coderspace Verification Code');
        await this._otpService.storeOtp(email, otp);
    }
};
exports.SendOtpUsecase = SendOtpUsecase;
exports.SendOtpUsecase = SendOtpUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IOtpService')),
    __param(1, (0, tsyringe_1.inject)('IEmailService')),
    __param(2, (0, tsyringe_1.inject)('IAccountRepository')),
    __metadata("design:paramtypes", [Object, Object, Object])
], SendOtpUsecase);
//# sourceMappingURL=send-otp.usercase.js.map