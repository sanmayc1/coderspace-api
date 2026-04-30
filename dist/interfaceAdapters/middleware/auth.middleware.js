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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const tsyringe_1 = require("tsyringe");
const constant_1 = require("../../shared/constant");
const index_1 = require("../controllers/auth/index");
const cookie_1 = __importDefault(require("cookie"));
let AuthMiddleware = class AuthMiddleware {
    _jwtService;
    _blacklistRepository;
    _accountsRepository;
    constructor(_jwtService, _blacklistRepository, _accountsRepository) {
        this._jwtService = _jwtService;
        this._blacklistRepository = _blacklistRepository;
        this._accountsRepository = _accountsRepository;
    }
    handle(role) {
        return async (req, res, next) => {
            const accessToken = req.cookies[constant_1.COOKIES_NAMES.ACCESS_TOKEN];
            const refreshToken = req.cookies[constant_1.COOKIES_NAMES.REFRESH_TOKEN];
            if (!accessToken) {
                res
                    .status(constant_1.HTTP_STATUS.UNAUTHORIZED)
                    .json({ success: false, message: constant_1.ERROR_MESSAGES.TOKEN_EXPIRE });
                return;
            }
            const payload = this._jwtService.verifyAccess(accessToken);
            const refreshPayload = this._jwtService.verifyRefresh(refreshToken);
            if (payload === null && refreshPayload === null) {
                res.status(constant_1.HTTP_STATUS.FORBIDDEN).json((0, index_1.commonResponse)(false, constant_1.ERROR_MESSAGES.FORCE_LOGOUT));
                return;
            }
            if (payload === null) {
                res
                    .status(constant_1.HTTP_STATUS.UNAUTHORIZED)
                    .json({ success: false, message: constant_1.ERROR_MESSAGES.TOKEN_EXPIRE });
                return;
            }
            // Checking access token is blacklisted
            const isBlacklisted = await this._blacklistRepository.find(`blacklist:${accessToken}`);
            if (isBlacklisted) {
                res
                    .status(constant_1.HTTP_STATUS.FORBIDDEN)
                    .json({ success: false, message: constant_1.ERROR_MESSAGES.TOKEN_BLACKLIST });
                return;
            }
            const account = await this._accountsRepository.findById(payload.accountId);
            if (account?.isBlocked) {
                res
                    .status(constant_1.HTTP_STATUS.FORBIDDEN)
                    .json((0, index_1.commonResponse)(false, constant_1.ERROR_MESSAGES.ACCOUNT_BLOCKED_FORCE_LOGOUT));
                return;
            }
            if (!role.includes(payload.role)) {
                res
                    .status(constant_1.HTTP_STATUS.FORBIDDEN)
                    .json({ success: false, message: constant_1.ERROR_MESSAGES.ACCESS_DENIED });
                return;
            }
            req.user = payload;
            next();
        };
    }
    socketAuthMiddleware(io) {
        io.use(async (socket, next) => {
            try {
                const cookies = cookie_1.default.parse(socket.handshake.headers.cookie || "");
                const token = cookies[constant_1.COOKIES_NAMES.ACCESS_TOKEN];
                if (!token) {
                    return next(new Error("TOKEN_EXPIRE"));
                }
                const decoded = this._jwtService.verifyAccess(token);
                socket.data.user = decoded;
                next();
            }
            catch (error) {
                return next(new Error("TOKEN_INVALID"));
            }
        });
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IJwtService')),
    __param(1, (0, tsyringe_1.inject)('IBlackListTokenRepository')),
    __param(2, (0, tsyringe_1.inject)('IAccountRepository')),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map