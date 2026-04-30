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
exports.GithHubAuthController = void 0;
const index_1 = require("./index");
let GithHubAuthController = class GithHubAuthController {
    _githubAuthUsecase;
    constructor(_githubAuthUsecase) {
        this._githubAuthUsecase = _githubAuthUsecase;
    }
    redirectToGithub(req, res) {
        const randomString = index_1.crypto.randomBytes(50).toString('hex');
        const url = `${index_1.config.github.redirectUrl}?client_id=${index_1.config.github.clientId}&redirect_uri=${index_1.config.github.calllbackUrl}&scope=user&state=${randomString}`;
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.GITHUB_SESSION, randomString, true, 'none');
        res.redirect(url);
    }
    async githubAuth(req, res) {
        const sessionState = req.signedCookies[index_1.COOKIES_NAMES.GITHUB_SESSION];
        const state = req.query.state;
        const code = req.query.code;
        const data = await this._githubAuthUsecase.execute(sessionState, state, code);
        if (data.statusCode !== index_1.HTTP_STATUS.OK) {
            res.redirect(`${index_1.config.client.uri}/user/login?error=${data.message}`);
            return;
        }
        res.clearCookie(index_1.COOKIES_NAMES.GITHUB_SESSION);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.ACCESS_TOKEN, data.accessToken);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.REFRESH_TOKEN, data.refreshToken);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.DEVICE_ID, data.deviceId, true);
        res.redirect(`${index_1.config.client.uri}`);
    }
};
exports.GithHubAuthController = GithHubAuthController;
exports.GithHubAuthController = GithHubAuthController = __decorate([
    (0, index_1.injectable)(),
    __param(0, (0, index_1.inject)('IGithHubAuthUsecase')),
    __metadata("design:paramtypes", [Object])
], GithHubAuthController);
//# sourceMappingURL=github-auth.controller.js.map