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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const tsyringe_1 = require("tsyringe");
const async_handler_1 = require("../../../../shared/async-handler");
const di_resolver_1 = require("../../../di/di-resolver");
const base_route_1 = require("../base-route");
const config_1 = require("../../../../shared/config");
let AuthRoute = class AuthRoute extends base_route_1.BaseRoute {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.post('/signup', (0, async_handler_1.asyncHandler)(di_resolver_1.authController.signup.bind(di_resolver_1.authController)));
        this.router.post('/otp', (0, async_handler_1.asyncHandler)(di_resolver_1.authController.sendOtp.bind(di_resolver_1.authController)));
        this.router.patch('/verify', (0, async_handler_1.asyncHandler)(di_resolver_1.authController.verifyOtp.bind(di_resolver_1.authController)));
        this.router.post('/login', (0, async_handler_1.asyncHandler)(di_resolver_1.authController.login.bind(di_resolver_1.authController)));
        this.router.post('/password/forget', (0, async_handler_1.asyncHandler)(di_resolver_1.authController.forgetPasword.bind(di_resolver_1.authController)));
        this.router.patch('/password/reset', (0, async_handler_1.asyncHandler)(di_resolver_1.authController.resetPassword.bind(di_resolver_1.authController)));
        this.router.post('/refresh', (0, async_handler_1.asyncHandler)(di_resolver_1.authController.tokenRefresh.bind(di_resolver_1.authController)));
        this.router.post('/logout', 
        // asyncHandler(authMiddleware.handle(["admin","company","user"]).bind(authMiddleware)),
        (0, async_handler_1.asyncHandler)(di_resolver_1.authController.logout.bind(di_resolver_1.authController)));
        this.router.get('/me', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['user', 'admin', 'company']).bind(di_resolver_1.authMiddleware)), (0, async_handler_1.asyncHandler)(di_resolver_1.authController.authenticatedUser.bind(di_resolver_1.authController)));
        this.router.get('/github/callback', (0, async_handler_1.asyncHandler)(di_resolver_1.githubAuthController.githubAuth.bind(di_resolver_1.githubAuthController)));
        this.router.get('/github', di_resolver_1.githubAuthController.redirectToGithub.bind(di_resolver_1.githubAuthController));
        this.router.get('/google', di_resolver_1.googleAuthService.getPassport().authenticate('google', { scope: ['profile', 'email'] }));
        this.router.get('/google/callback', di_resolver_1.googleAuthService.getPassport().authenticate('google', {
            session: false,
            failureRedirect: config_1.config.client.uri,
        }), (0, async_handler_1.asyncHandler)(di_resolver_1.googleAuthController.googleAuth.bind(di_resolver_1.googleAuthController)));
        this.router.post('/company/login', (0, async_handler_1.asyncHandler)(di_resolver_1.authController.companyLogin.bind(di_resolver_1.authController)));
        this.router.post('/admin/login', (0, async_handler_1.asyncHandler)(di_resolver_1.authController.adminLogin.bind(di_resolver_1.authController)));
        this.router.post('/company/register', (0, async_handler_1.asyncHandler)(di_resolver_1.authController.companyRegister.bind(di_resolver_1.authController)));
    }
};
exports.AuthRoute = AuthRoute;
exports.AuthRoute = AuthRoute = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], AuthRoute);
//# sourceMappingURL=auth.route.js.map