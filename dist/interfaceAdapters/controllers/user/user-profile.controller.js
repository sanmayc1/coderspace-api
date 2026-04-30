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
exports.UserProfileController = void 0;
const tsyringe_1 = require("tsyringe");
const index_1 = require("../auth/index");
const constant_1 = require("../../../shared/constant");
const user_validation_1 = require("./validation/user.validation");
const user_validation_schema_1 = require("../auth/validation/user-validation-schema");
let UserProfileController = class UserProfileController {
    _getUserUsecase;
    _updateSuggestionLevelUsecase;
    _updateUserProfileUsecase;
    _updateUserPasswordUsecase;
    constructor(_getUserUsecase, _updateSuggestionLevelUsecase, _updateUserProfileUsecase, _updateUserPasswordUsecase) {
        this._getUserUsecase = _getUserUsecase;
        this._updateSuggestionLevelUsecase = _updateSuggestionLevelUsecase;
        this._updateUserProfileUsecase = _updateUserProfileUsecase;
        this._updateUserPasswordUsecase = _updateUserPasswordUsecase;
    }
    async getUser(req, res) {
        const accountId = req.user.accountId;
        const response = await this._getUserUsecase.execute(accountId);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.USER_FETCHED, response));
    }
    async updateSuggestionLevel(req, res) {
        const { level } = req.body;
        if (!level || !constant_1.DIFFICULTY.includes(level)) {
            res.status(400).json((0, index_1.commonResponse)(false, constant_1.ERROR_MESSAGES.INVALID_BODY));
            return;
        }
        await this._updateSuggestionLevelUsecase.execute({
            level,
            accountId: req?.user?.accountId,
        });
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.SUGGESTION_LEVEL));
    }
    async updateUserProfile(req, res) {
        const valiidatedData = user_validation_1.userProfileUpdateSchema.parse(req.body);
        await this._updateUserProfileUsecase.execute({
            ...valiidatedData,
            accountId: req?.user?.accountId,
            profileImage: req?.file,
        });
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.USER_PROFILE_UPDATED));
    }
    async updatePassword(req, res) {
        const validatedData = user_validation_schema_1.UpdatePasswordSchema.parse(req.body);
        console.log(validatedData);
        await this._updateUserPasswordUsecase.execute({
            ...validatedData,
            accountId: req?.user?.accountId,
        });
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.PASSWORD_UPDATED));
    }
};
exports.UserProfileController = UserProfileController;
exports.UserProfileController = UserProfileController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IGetUserUsecase')),
    __param(1, (0, tsyringe_1.inject)('IUpdateSuggestionLevelUsecase')),
    __param(2, (0, tsyringe_1.inject)('IUpdateUserProfileUsecase')),
    __param(3, (0, tsyringe_1.inject)('IUpdateUserPasswordUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], UserProfileController);
//# sourceMappingURL=user-profile.controller.js.map