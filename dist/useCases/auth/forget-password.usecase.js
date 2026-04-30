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
exports.ForgetPasswordUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../domain/utils/custom-error");
const constant_1 = require("../../shared/constant");
let ForgetPasswordUsecase = class ForgetPasswordUsecase {
    _passwordRestRepository;
    _accountRepository;
    _bcrypt;
    constructor(_passwordRestRepository, _accountRepository, _bcrypt) {
        this._passwordRestRepository = _passwordRestRepository;
        this._accountRepository = _accountRepository;
        this._bcrypt = _bcrypt;
    }
    async execute(token, newPassword) {
        const accountId = await this._passwordRestRepository.find(`reset:${token}`);
        if (!accountId) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.REST_LINK_EXPIRE);
        }
        const account = await this._accountRepository.findById(accountId);
        if (!account) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.REST_LINK_EXPIRE);
        }
        const hasedPassword = await this._bcrypt.hash(newPassword);
        await this._accountRepository.updateById(accountId, {
            password: hasedPassword,
        });
        await this._passwordRestRepository.del(`reset:${token}`);
    }
};
exports.ForgetPasswordUsecase = ForgetPasswordUsecase;
exports.ForgetPasswordUsecase = ForgetPasswordUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IPasswordRestRepository')),
    __param(1, (0, tsyringe_1.inject)('IAccountRepository')),
    __param(2, (0, tsyringe_1.inject)('IBcrypt')),
    __metadata("design:paramtypes", [Object, Object, Object])
], ForgetPasswordUsecase);
//# sourceMappingURL=forget-password.usecase.js.map