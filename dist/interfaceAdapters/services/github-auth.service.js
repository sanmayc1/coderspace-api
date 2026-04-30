"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubAuthService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../shared/config");
const tsyringe_1 = require("tsyringe");
const constant_1 = require("../../shared/constant");
let GitHubAuthService = class GitHubAuthService {
    async exchangeToken(code) {
        const response = await axios_1.default.post(`${config_1.config.github.exchangeTokenUrl}?client_id=${config_1.config.github.clientId}&client_secret=${config_1.config.github.secret}&code=${code}&redirect_uri=${config_1.config.github.calllbackUrl}`);
        if (response.status !== constant_1.HTTP_STATUS.OK) {
            return null;
        }
        const params = new URLSearchParams(response.data);
        return params.get('access_token');
    }
    async getUserProfile(accessToken) {
        const response = await axios_1.default.get(`${config_1.config.github.getUserUrl}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const user = response.data;
        if (!user.email) {
            const response = await axios_1.default.get(`${config_1.config.github.getUserUrl}/emails`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            for (const data of response.data) {
                if (data.verified && data.primary) {
                    user.email = data.email;
                }
            }
        }
        return user;
    }
};
exports.GitHubAuthService = GitHubAuthService;
exports.GitHubAuthService = GitHubAuthService = __decorate([
    (0, tsyringe_1.injectable)()
], GitHubAuthService);
//# sourceMappingURL=github-auth.service.js.map