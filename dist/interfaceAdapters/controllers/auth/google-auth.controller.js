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
exports.GoogleAuthController = void 0;
const index_1 = require("./index");
let GoogleAuthController = class GoogleAuthController {
    _googleAuthUsecase;
    constructor(_googleAuthUsecase) {
        this._googleAuthUsecase = _googleAuthUsecase;
    }
    async googleAuth(req, res) {
        const userProfile = req.user;
        const data = await this._googleAuthUsecase.execute(userProfile);
        if (data.statusCode !== index_1.HTTP_STATUS.OK) {
            res.redirect(`${index_1.config.client.uri}/user/login?error=${data.message}`);
            return;
        }
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.ACCESS_TOKEN, data.accessToken);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.REFRESH_TOKEN, data.refreshToken);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.DEVICE_ID, data.deviceId, true);
        res.redirect(`${index_1.config.client.uri}`);
    }
};
exports.GoogleAuthController = GoogleAuthController;
exports.GoogleAuthController = GoogleAuthController = __decorate([
    (0, index_1.injectable)(),
    __param(0, (0, index_1.inject)('IGoogleAuthUsecase')),
    __metadata("design:paramtypes", [Object])
], GoogleAuthController);
//# sourceMappingURL=google-auth.controller.js.map