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
exports.GitHubAuthUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const constant_1 = require("../../shared/constant");
let GitHubAuthUsecase = class GitHubAuthUsecase {
    _githubAuthService;
    _userRepository;
    _walletRepository;
    _jwtService;
    _uniqueIdService;
    _accountRepository;
    constructor(_githubAuthService, _userRepository, _walletRepository, _jwtService, _uniqueIdService, _accountRepository) {
        this._githubAuthService = _githubAuthService;
        this._userRepository = _userRepository;
        this._walletRepository = _walletRepository;
        this._jwtService = _jwtService;
        this._uniqueIdService = _uniqueIdService;
        this._accountRepository = _accountRepository;
    }
    async execute(sessionState, state, code) {
        if (state !== sessionState) {
            return {
                statusCode: constant_1.HTTP_STATUS.UNAUTHORIZED,
                message: constant_1.ERROR_MESSAGES.INVALID_AUTH_STATE,
            };
        }
        const token = await this._githubAuthService.exchangeToken(code);
        if (token === null) {
            return {
                statusCode: constant_1.HTTP_STATUS.UNAUTHORIZED,
                message: constant_1.ERROR_MESSAGES.INVALID_AUTH_CODE,
            };
        }
        const userProfile = await this._githubAuthService.getUserProfile(token);
        let account = await this._accountRepository.findByEmail(userProfile.email);
        let user;
        if (!account) {
            const baseUsername = `@${userProfile.email.split('@')[0]}`;
            let username = '';
            let exists = true;
            while (exists) {
                const ending = Math.floor(Math.random() * 1000 + 9000);
                username = baseUsername + ending;
                exists = await this._userRepository.findByUsername(username);
            }
            const newAccount = {
                email: userProfile.email,
                name: userProfile.name,
                authProvider: 'github',
                isVerified: true,
                ...(userProfile.avatar_url && { profileUrl: userProfile.avatar_url }),
            };
            account = await this._accountRepository.create(newAccount);
            user = await this._userRepository.create({
                accountId: account._id,
                username,
            });
            await this._walletRepository.create({ accountId: account._id });
        }
        else if (account.authProvider !== 'github') {
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
exports.GitHubAuthUsecase = GitHubAuthUsecase;
exports.GitHubAuthUsecase = GitHubAuthUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IGitHubAuthService')),
    __param(1, (0, tsyringe_1.inject)('IUserRepository')),
    __param(2, (0, tsyringe_1.inject)('IWalletRepository')),
    __param(3, (0, tsyringe_1.inject)('IJwtService')),
    __param(4, (0, tsyringe_1.inject)('IUniqueIdService')),
    __param(5, (0, tsyringe_1.inject)('IAccountRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], GitHubAuthUsecase);
//# sourceMappingURL=github-auth.usecase.js.map