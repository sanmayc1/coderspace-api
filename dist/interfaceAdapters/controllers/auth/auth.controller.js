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
exports.AuthController = void 0;
const index_1 = require("./index");
const company_validation_schema_1 = require("./validation/company-validation-schema");
let AuthController = class AuthController {
    _registerUsecase;
    _sendOtpUsecase;
    _verifyOtpUsecase;
    _loginUserUsecase;
    _refreshTokenUsecase;
    _logoutUsecase;
    _sendRestPasswordLink;
    _forgetPassword;
    _authUserUsecase;
    _loginCompanyUsecase;
    _registerCompanyUsecase;
    _adminLoginUsecase;
    constructor(_registerUsecase, _sendOtpUsecase, _verifyOtpUsecase, _loginUserUsecase, _refreshTokenUsecase, _logoutUsecase, _sendRestPasswordLink, _forgetPassword, _authUserUsecase, _loginCompanyUsecase, _registerCompanyUsecase, _adminLoginUsecase) {
        this._registerUsecase = _registerUsecase;
        this._sendOtpUsecase = _sendOtpUsecase;
        this._verifyOtpUsecase = _verifyOtpUsecase;
        this._loginUserUsecase = _loginUserUsecase;
        this._refreshTokenUsecase = _refreshTokenUsecase;
        this._logoutUsecase = _logoutUsecase;
        this._sendRestPasswordLink = _sendRestPasswordLink;
        this._forgetPassword = _forgetPassword;
        this._authUserUsecase = _authUserUsecase;
        this._loginCompanyUsecase = _loginCompanyUsecase;
        this._registerCompanyUsecase = _registerCompanyUsecase;
        this._adminLoginUsecase = _adminLoginUsecase;
    }
    // Signup Controller
    async signup(req, res) {
        const validated = index_1.UserSchema.parse({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });
        const email = await this._registerUsecase.execute(validated);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.SIGNUP, email, true);
        res.status(index_1.HTTP_STATUS.CREATED).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.USER_REGISTERED));
    }
    // Send OTP Controller
    async sendOtp(req, res) {
        const email = req.signedCookies[index_1.COOKIES_NAMES.SIGNUP];
        if (!email) {
            throw new index_1.CustomError(index_1.HTTP_STATUS.BAD_REQUEST, index_1.ERROR_MESSAGES.NO_COOKIES);
        }
        await this._sendOtpUsecase.execute(email);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.SEND_OTP_TO_MAIL));
    }
    // Verify OTP Controller
    async verifyOtp(req, res) {
        const email = req.signedCookies[index_1.COOKIES_NAMES.SIGNUP];
        if (!email) {
            throw new index_1.CustomError(index_1.HTTP_STATUS.BAD_REQUEST, index_1.ERROR_MESSAGES.NO_COOKIES);
        }
        const otp = req.body.otp;
        await this._verifyOtpUsecase.execute(email, otp);
        res.clearCookie(index_1.COOKIES_NAMES.SIGNUP);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.OTP_VERIFIED));
    }
    // Login Controller
    async login(req, res) {
        const { email, password } = req.body;
        const validated = index_1.LoginSchema.parse({ email, password });
        const data = await this._loginUserUsecase.execute(validated);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.ACCESS_TOKEN, data.accessToken);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.REFRESH_TOKEN, data.refreshToken);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.DEVICE_ID, data.deviceId, true);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.LOGIN, data.response));
    }
    // Token refresh Controller
    async tokenRefresh(req, res) {
        const token = req.cookies[index_1.COOKIES_NAMES.REFRESH_TOKEN];
        const deviceId = req.signedCookies[index_1.COOKIES_NAMES.DEVICE_ID];
        if (!token) {
            res
                .status(index_1.HTTP_STATUS.UNAUTHORIZED)
                .json((0, index_1.commonResponse)(false, index_1.ERROR_MESSAGES.TOKEN_MISSING));
            return;
        }
        const accessToken = await this._refreshTokenUsecase.execute(token, deviceId);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.ACCESS_TOKEN, accessToken);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.TOKEN_REFRESH));
    }
    // Logout User
    async logout(req, res) {
        const refreshToken = req.cookies[index_1.COOKIES_NAMES.REFRESH_TOKEN];
        const accessToken = req.cookies[index_1.COOKIES_NAMES.ACCESS_TOKEN];
        await this._logoutUsecase.executes(refreshToken, accessToken);
        res.clearCookie(index_1.COOKIES_NAMES.ACCESS_TOKEN);
        res.clearCookie(index_1.COOKIES_NAMES.REFRESH_TOKEN);
        res.clearCookie(index_1.COOKIES_NAMES.DEVICE_ID);
        res.status(index_1.HTTP_STATUS.NO_CONTENT).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.LOGOUT));
    }
    async forgetPasword(req, res) {
        const email = req.body.email;
        await this._sendRestPasswordLink.execute(email);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.SEND_PASSWORD_REST_LINK));
    }
    async resetPassword(req, res) {
        const password = index_1.passwordSchema.parse(req.body.newPassword);
        const token = req.body.token;
        await this._forgetPassword.execute(token, password);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.PASSWORD_REST));
    }
    async authenticatedUser(req, res) {
        const response = await this._authUserUsecase.execute(req.user);
        res
            .status(index_1.HTTP_STATUS.OK)
            .json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.ACCOUNT_DETAILS, response));
    }
    async companyLogin(req, res) {
        const { email, password } = req.body;
        const validated = index_1.LoginSchema.parse({ email, password });
        const data = await this._loginCompanyUsecase.execute(validated);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.ACCESS_TOKEN, data.accessToken);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.REFRESH_TOKEN, data.refreshToken);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.DEVICE_ID, data.deviceId, true);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.LOGIN, data.response));
    }
    async adminLogin(req, res) {
        const { email, password } = req.body;
        const validated = index_1.LoginSchema.parse({ email, password });
        const data = await this._adminLoginUsecase.execute(validated);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.ACCESS_TOKEN, data.accessToken);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.REFRESH_TOKEN, data.refreshToken);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.DEVICE_ID, data.deviceId, true);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.LOGIN, data.response));
    }
    async companyRegister(req, res) {
        const validated = company_validation_schema_1.CompanyRegisterSchema.parse({
            name: req.body.companyName,
            email: req.body.email,
            gstin: req.body.gstin,
            password: req.body.password,
        });
        const email = await this._registerCompanyUsecase.execute(validated);
        (0, index_1.setCookies)(res, index_1.COOKIES_NAMES.SIGNUP, email, true);
        res.status(index_1.HTTP_STATUS.CREATED).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.COMPANY_REGISTERED));
    }
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, index_1.injectable)(),
    __param(0, (0, index_1.inject)('IUserRegisterUsecase')),
    __param(1, (0, index_1.inject)('ISendOtpUsecase')),
    __param(2, (0, index_1.inject)('IVerifyOtpUsecase')),
    __param(3, (0, index_1.inject)('ILoginUserUsecase')),
    __param(4, (0, index_1.inject)('IRefreshTokenUsecase')),
    __param(5, (0, index_1.inject)('ILogoutUsecase')),
    __param(6, (0, index_1.inject)('ISendRestPasswordLink')),
    __param(7, (0, index_1.inject)('IForgetPasswordUsecase')),
    __param(8, (0, index_1.inject)('IAuthUserUsecase')),
    __param(9, (0, index_1.inject)('ILoginCompanyUsecase')),
    __param(10, (0, index_1.inject)('IRegisterCompanyUsecase')),
    __param(11, (0, index_1.inject)('ILoginAdminUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], AuthController);
//# sourceMappingURL=auth.controller.js.map