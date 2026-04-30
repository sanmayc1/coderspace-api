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
exports.UpdateUserProfileUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
let UpdateUserProfileUsecase = class UpdateUserProfileUsecase {
    _accountRepository;
    _userRepository;
    _imageStoreService;
    constructor(_accountRepository, _userRepository, _imageStoreService) {
        this._accountRepository = _accountRepository;
        this._userRepository = _userRepository;
        this._imageStoreService = _imageStoreService;
    }
    async execute(data) {
        const { name, username, about, profileImage, accountId } = data;
        const accountUpadate = {};
        const userUpadate = {};
        const account = await this._accountRepository.findById(accountId);
        if (!account) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
        }
        const user = await this._userRepository.findByAccountId(accountId);
        if (!user) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.USER_NOT_FOUND);
        }
        if (profileImage) {
            const { url } = await this._imageStoreService.uploadImage(profileImage, 'profiles');
            accountUpadate.profileUrl = url;
        }
        if (account.name !== name) {
            accountUpadate.name = name;
        }
        if (username !== user.username) {
            const exist = await this._userRepository.findByUsername(username);
            if (exist) {
                throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.CONFLICT, constant_1.ERROR_MESSAGES.USERNAME_EXIST);
            }
            userUpadate.username = username;
        }
        if (about && about !== user.about) {
            userUpadate.about = about;
        }
        await this._userRepository.updateById(user._id, userUpadate);
        await this._accountRepository.updateById(accountId, accountUpadate);
    }
};
exports.UpdateUserProfileUsecase = UpdateUserProfileUsecase;
exports.UpdateUserProfileUsecase = UpdateUserProfileUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IAccountRepository')),
    __param(1, (0, tsyringe_1.inject)('IUserRepository')),
    __param(2, (0, tsyringe_1.inject)('IImageStoreService')),
    __metadata("design:paramtypes", [Object, Object, Object])
], UpdateUserProfileUsecase);
//# sourceMappingURL=user-profile-update.usecase.js.map