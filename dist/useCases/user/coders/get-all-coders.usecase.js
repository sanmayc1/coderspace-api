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
exports.GetAllCoders = void 0;
const tsyringe_1 = require("tsyringe");
const mappers_1 = require("../../dtos/mappers/mappers");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
let GetAllCoders = class GetAllCoders {
    _userRepository;
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute(accountId) {
        const requestedUser = await this._userRepository.findByAccountId(accountId);
        if (!requestedUser) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.NOT_FOUND, constant_1.ERROR_MESSAGES.USER_NOT_FOUND);
        }
        const users = await this._userRepository.getAllUsersWithFollowing(requestedUser._id);
        return users.map((user) => mappers_1.getAllCodersUsecaseMapper.toResponse(user));
    }
};
exports.GetAllCoders = GetAllCoders;
exports.GetAllCoders = GetAllCoders = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object])
], GetAllCoders);
//# sourceMappingURL=get-all-coders.usecase.js.map