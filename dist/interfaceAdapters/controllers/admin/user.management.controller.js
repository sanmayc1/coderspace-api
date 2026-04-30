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
exports.UserManagementController = void 0;
const tsyringe_1 = require("tsyringe");
const index_1 = require("../auth/index");
const mongo_utils_1 = require("../../../shared/utils/mongo-utils");
const regex_1 = require("../../../shared/validation/regex");
const schema_1 = require("./validation/schema");
let UserManagementController = class UserManagementController {
    _getUsersUsecase;
    _updateUserUsecase;
    _updateUserStatusUsecase;
    constructor(_getUsersUsecase, _updateUserUsecase, _updateUserStatusUsecase) {
        this._getUsersUsecase = _getUsersUsecase;
        this._updateUserUsecase = _updateUserUsecase;
        this._updateUserStatusUsecase = _updateUserStatusUsecase;
    }
    async getAllUsers(req, res) {
        const { page, sort, search, limit } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const searchValue = search?.trim() || '';
        const sortValue = sort?.trim() || '';
        if (Number.isNaN(pageNumber) || pageNumber <= 0) {
            throw new index_1.CustomError(index_1.HTTP_STATUS.BAD_REQUEST, index_1.ERROR_MESSAGES.PAGE_NOT_NUMBER);
        }
        if (Number.isNaN(limitNumber) || limitNumber <= 0) {
            throw new index_1.CustomError(index_1.HTTP_STATUS.BAD_REQUEST, index_1.ERROR_MESSAGES.LIMIT_NOT_NUMBER);
        }
        if (sortValue && !mongo_utils_1.USER_SORTING.hasOwnProperty(sortValue)) {
            throw new index_1.CustomError(index_1.HTTP_STATUS.BAD_REQUEST, index_1.ERROR_MESSAGES.INVALID_SORT);
        }
        if (searchValue && !regex_1.searchRegex.test(searchValue)) {
            throw new index_1.CustomError(index_1.HTTP_STATUS.BAD_REQUEST, index_1.ERROR_MESSAGES.INVALID_SEARCH);
        }
        const users = await this._getUsersUsecase.execute({
            page: pageNumber,
            sort: sortValue,
            limit: limitNumber,
            search: searchValue,
        });
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.USERS_FETCHED, users));
    }
    async updateUserProfile(req, res) {
        const userId = req.params.id;
        const { currentLevel, currentBadge } = req.body;
        const validated = schema_1.UserProfileUpdateSchema.safeParse({
            userId: userId,
            level: currentLevel,
            badge: currentBadge,
        });
        if (!validated.success) {
            throw new index_1.CustomError(index_1.HTTP_STATUS.BAD_REQUEST, validated.error?._zod.def[0].message);
        }
        await this._updateUserUsecase.execute(validated.data);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.UPDATED));
    }
    async updateUserStatus(req, res) {
        const accountId = req.params.id;
        if (!accountId.trim()) {
            throw new index_1.CustomError(index_1.HTTP_STATUS.BAD_REQUEST, index_1.ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
        }
        this._updateUserStatusUsecase.execute(accountId);
        res.status(index_1.HTTP_STATUS.OK).json((0, index_1.commonResponse)(true, index_1.SUCCESS_MESSAGES.STATUS_UPDATED));
    }
};
exports.UserManagementController = UserManagementController;
exports.UserManagementController = UserManagementController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IGetUsersUsecase')),
    __param(1, (0, tsyringe_1.inject)('IUpdateUserUsecase')),
    __param(2, (0, tsyringe_1.inject)('IUpdateUserStatusUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserManagementController);
//# sourceMappingURL=user.management.controller.js.map