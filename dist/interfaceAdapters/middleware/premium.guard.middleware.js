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
exports.PremiumGuardMiddleware = void 0;
const tsyringe_1 = require("tsyringe");
const constant_1 = require("../../shared/constant");
const auth_1 = require("../controllers/auth");
let PremiumGuardMiddleware = class PremiumGuardMiddleware {
    _userRepository;
    _problemRepository;
    constructor(_userRepository, _problemRepository) {
        this._userRepository = _userRepository;
        this._problemRepository = _problemRepository;
    }
    protect(content) {
        return async (req, res, next) => {
            const { id } = req.params;
            if (content === 'problem') {
                const problem = await this._problemRepository.findById(id);
                if (!problem) {
                    throw new auth_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.PROBLEM_NOT_FOUND);
                }
                if (!problem.isPremium) {
                    return next();
                }
                const user = await this._userRepository.findByAccountId(req.user?.accountId);
                if (!user) {
                    throw new auth_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.USER_NOT_FOUND);
                }
                if (!user.subscription) {
                    throw new auth_1.CustomError(constant_1.HTTP_STATUS.FORBIDDEN, constant_1.ERROR_MESSAGES.PREMIUM_REQUIRED);
                }
                if (user.subscription.endDate < new Date()) {
                    await this._userRepository.updateById(user._id, {
                        subscription: null,
                    });
                    throw new auth_1.CustomError(constant_1.HTTP_STATUS.FORBIDDEN, constant_1.ERROR_MESSAGES.PREMIUM_REQUIRED);
                }
                return next();
            }
            if (content === 'interview') {
                return next();
            }
        };
    }
};
exports.PremiumGuardMiddleware = PremiumGuardMiddleware;
exports.PremiumGuardMiddleware = PremiumGuardMiddleware = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IUserRepository')),
    __param(1, (0, tsyringe_1.inject)('IProblemRepository')),
    __metadata("design:paramtypes", [Object, Object])
], PremiumGuardMiddleware);
//# sourceMappingURL=premium.guard.middleware.js.map