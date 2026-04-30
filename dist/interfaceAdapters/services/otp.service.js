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
exports.OtpService = void 0;
const tsyringe_1 = require("tsyringe");
let OtpService = class OtpService {
    _bcrypt;
    _otpRepo;
    constructor(_bcrypt, _otpRepo) {
        this._bcrypt = _bcrypt;
        this._otpRepo = _otpRepo;
    }
    async verifyOtp(current, original) {
        return await this._bcrypt.compare(current, original);
    }
    async storeOtp(email, otp) {
        const hashedOtp = await this._bcrypt.hash(otp);
        const now = new Date();
        const expiry = now.getTime() + 5 * 60 * 1000;
        await this._otpRepo.save({
            email,
            otp: hashedOtp,
            expiry,
        });
    }
    async deleteOtp(email) {
        await this._otpRepo.delete(email);
    }
    generateOtp() {
        const otp = Math.floor(Math.random() * 900000 + 100000).toString();
        return otp;
    }
    async otpExists(email) {
        return await this._otpRepo.findByEmail(email);
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IBcrypt')),
    __param(1, (0, tsyringe_1.inject)('IOtpRepository')),
    __metadata("design:paramtypes", [Object, Object])
], OtpService);
//# sourceMappingURL=otp.service.js.map