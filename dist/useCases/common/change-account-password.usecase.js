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
exports.ChangeAccountPasswordUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../domain/utils/custom-error");
const constant_1 = require("../../shared/constant");
let ChangeAccountPasswordUsecase = class ChangeAccountPasswordUsecase {
    _accountRepository;
    _bcryptService;
    constructor(_accountRepository, _bcryptService) {
        this._accountRepository = _accountRepository;
        this._bcryptService = _bcryptService;
    }
    async execute(data) {
        const account = await this._accountRepository.findById(data.accountId);
        if (!account) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
        }
        if (account.authProvider !== 'local') {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.INVALID_AUTH_PROVIDER);
        }
        const isPasswordValid = await this._bcryptService.compare(data.currentPassword, account.password);
        if (!isPasswordValid) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.INVALID_CURRENT_PASSWORD, 'currentPassword');
        }
        if (data.newPassword === data.currentPassword) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.OLD_PASSWORD_AND_NEW_PASSWORD_SAME, 'currentPassword');
        }
        const hashedPassword = await this._bcryptService.hash(data.newPassword);
        await this._accountRepository.updateById(data.accountId, { password: hashedPassword });
    }
};
exports.ChangeAccountPasswordUsecase = ChangeAccountPasswordUsecase;
exports.ChangeAccountPasswordUsecase = ChangeAccountPasswordUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IAccountRepository')),
    __param(1, (0, tsyringe_1.inject)('IBcrypt')),
    __metadata("design:paramtypes", [Object, Object])
], ChangeAccountPasswordUsecase);
//# sourceMappingURL=change-account-password.usecase.js.map