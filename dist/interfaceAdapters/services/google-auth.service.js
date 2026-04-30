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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthService = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_1 = require("../../shared/config");
const tsyringe_1 = require("tsyringe");
let GoogleAuthService = class GoogleAuthService {
    passport;
    constructor() {
        this.passport = passport_1.default;
        this.passport.use(new passport_google_oauth20_1.Strategy({
            clientID: `${config_1.config.google.clientId}`,
            clientSecret: `${config_1.config.google.secret}`,
            callbackURL: config_1.config.google.callbackUrl,
        }, async (accessToken, refreshToken, profile, done) => {
            done(null, profile);
        }));
    }
    getPassport() {
        return this.passport;
    }
};
exports.GoogleAuthService = GoogleAuthService;
exports.GoogleAuthService = GoogleAuthService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], GoogleAuthService);
//# sourceMappingURL=google-auth.service.js.map