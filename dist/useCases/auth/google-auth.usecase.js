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
exports.GoogleAuthUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const mappers_1 = require("../dtos/mappers/mappers");
const constant_1 = require("../../shared/constant");
let GoogleAuthUsecase = class GoogleAuthUsecase {
    _accountRepository;
    _userRepository;
    _uniqueIdService;
    _jwtService;
    _walletRepository;
    constructor(_accountRepository, _userRepository, _uniqueIdService, _jwtService, _walletRepository) {
        this._accountRepository = _accountRepository;
        this._userRepository = _userRepository;
        this._uniqueIdService = _uniqueIdService;
        this._jwtService = _jwtService;
        this._walletRepository = _walletRepository;
    }
    async execute(data) {
        const accountEntity = mappers_1.googleAuthUsecaseMapper.toEntity(data);
        let account = await this._accountRepository.findByEmail(accountEntity.email);
        let user;
        if (!account) {
            console.log('account-entity', accountEntity);
            account = await this._accountRepository.create(accountEntity);
            const baseUsername = `@${account.email.split('@')[0]}`;
            let username = '';
            let exists = true;
            while (exists) {
                const ending = Math.floor(Math.random() * 1000 + 9000);
                username = baseUsername + ending;
                exists = await this._userRepository.findByUsername(username);
            }
            user = await this._userRepository.create({
                accountId: account._id,
                username,
            });
            await this._walletRepository.create({ accountId: account._id });
        }
        else if (account?.authProvider !== 'google') {
            return {
                statusCode: constant_1.HTTP_STATUS.UNAUTHORIZED,
                message: constant_1.ERROR_MESSAGES.INVALID_AUTH_PROVIDER,
            };
        }
        else {
            user = await this._userRepository.findByAccountId(account._id);
        }
        const deviceId = this._uniqueIdService.generate();
        const payload = {
            accountId: account._id,
            deviceId,
            isProfileComplete: user?.isProfileComplete,
            role: account.role,
        };
        const accessToken = this._jwtService.signAccess(payload);
        const refreshToken = this._jwtService.signRefresh(payload);
        return {
            statusCode: constant_1.HTTP_STATUS.OK,
            accessToken,
            refreshToken,
            deviceId,
        };
    }
};
exports.GoogleAuthUsecase = GoogleAuthUsecase;
exports.GoogleAuthUsecase = GoogleAuthUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IAccountRepository')),
    __param(1, (0, tsyringe_1.inject)('IUserRepository')),
    __param(2, (0, tsyringe_1.inject)('IUniqueIdService')),
    __param(3, (0, tsyringe_1.inject)('IJwtService')),
    __param(4, (0, tsyringe_1.inject)('IWalletRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], GoogleAuthUsecase);
//# sourceMappingURL=google-auth.usecase.js.map