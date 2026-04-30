"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../shared/config");
class JwtService {
    refreshSecret;
    accessSecret;
    accessExpireIn;
    refreshExpireIn;
    constructor() {
        this.refreshSecret = config_1.config.jwt.refreshSecret;
        this.accessSecret = config_1.config.jwt.accessSecret;
        this.refreshExpireIn = config_1.config.jwt.refreshExpire;
        this.accessExpireIn = config_1.config.jwt.accessExpire;
    }
    signAccess(payload) {
        return jsonwebtoken_1.default.sign(payload, this.accessSecret, {
            expiresIn: this.accessExpireIn,
        });
    }
    signRefresh(payload, expireIn = this.refreshExpireIn) {
        return jsonwebtoken_1.default.sign(payload, this.refreshSecret, {
            expiresIn: expireIn,
        });
    }
    verifyAccess(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.accessSecret);
        }
        catch (error) {
            return null;
        }
    }
    verifyRefresh(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.refreshSecret);
        }
        catch (error) {
            return null;
        }
    }
}
exports.JwtService = JwtService;
//# sourceMappingURL=jwt-service.js.map