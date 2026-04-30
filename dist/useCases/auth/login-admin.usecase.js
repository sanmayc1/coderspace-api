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
exports.LoginAdminUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../domain/utils/custom-error");
const constant_1 = require("../../shared/constant");
const register_usecase_mapper_1 = require("../dtos/mappers/register.usecase.mapper");
let LoginAdminUsecase = class LoginAdminUsecase {
    _bcrypt;
    _jwtService;
    _uniqueIdService;
    _accountRepository;
    constructor(_bcrypt, _jwtService, _uniqueIdService, _accountRepository) {
        this._bcrypt = _bcrypt;
        this._jwtService = _jwtService;
        this._uniqueIdService = _uniqueIdService;
        this._accountRepository = _accountRepository;
    }
    async execute(data) {
        const account = await this._accountRepository.findByEmail(data.email);
        if (!account) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.INVALID_CREDENTIALS, 'password');
        }
        if (account.authProvider !== 'local') {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.INVALID_CREDENTIALS, 'password');
        }
        const isMatch = await this._bcrypt.compare(data.password, account.password);
        if (!isMatch) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.INVALID_CREDENTIALS, 'password');
        }
        if (!account.isVerified) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.FORBIDDEN, constant_1.ERROR_MESSAGES.ACCOUNT_NOT_VERIFIED);
        }
        if (account.role !== 'admin') {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.FORBIDDEN, constant_1.ERROR_MESSAGES.AUTH_ACCESS_DENIED, 'password');
        }
        const deviceId = this._uniqueIdService.generate();
        const accessToken = this._jwtService.signAccess({
            accountId: account._id,
            role: account.role,
            deviceId,
        });
        const refreshToken = this._jwtService.signRefresh({
            accountId: account._id,
            role: account.role,
            deviceId,
        });
        const response = register_usecase_mapper_1.LoginUsecaseMapper.toResponse(account);
        return {
            accessToken,
            refreshToken,
            deviceId,
            response,
        };
    }
};
exports.LoginAdminUsecase = LoginAdminUsecase;
exports.LoginAdminUsecase = LoginAdminUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IBcrypt')),
    __param(1, (0, tsyringe_1.inject)('IJwtService')),
    __param(2, (0, tsyringe_1.inject)('IUniqueIdService')),
    __param(3, (0, tsyringe_1.inject)('IAccountRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], LoginAdminUsecase);
//# sourceMappingURL=login-admin.usecase.js.map