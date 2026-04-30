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
exports.CodersController = void 0;
const tsyringe_1 = require("tsyringe");
const auth_1 = require("../auth");
let CodersController = class CodersController {
    _getAllCodersUsecase;
    _followCodersUsecase;
    _unfollowCodersUsecase;
    _getCoderUsecase;
    constructor(_getAllCodersUsecase, _followCodersUsecase, _unfollowCodersUsecase, _getCoderUsecase) {
        this._getAllCodersUsecase = _getAllCodersUsecase;
        this._followCodersUsecase = _followCodersUsecase;
        this._unfollowCodersUsecase = _unfollowCodersUsecase;
        this._getCoderUsecase = _getCoderUsecase;
    }
    async getAllCoders(req, res) {
        const coders = await this._getAllCodersUsecase.execute(req.user?.accountId);
        res.status(auth_1.HTTP_STATUS.OK).json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.GET_ALL_CODERS, coders));
    }
    async followCoders(req, res) {
        const { followingId } = req.body;
        await this._followCodersUsecase.execute(req.user?.accountId, followingId);
        res.status(auth_1.HTTP_STATUS.OK).json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.FOLLOW_CODER));
    }
    async unfollowCoders(req, res) {
        const { id } = req.params;
        await this._unfollowCodersUsecase.execute(req.user?.accountId, id);
        res.status(auth_1.HTTP_STATUS.OK).json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.UNFOLLOW_CODER));
    }
    async getCoder(req, res) {
        const { id } = req.params;
        const coder = await this._getCoderUsecase.execute(req.user?.accountId, id);
        res.status(auth_1.HTTP_STATUS.OK).json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.GET_CODER, coder));
    }
};
exports.CodersController = CodersController;
exports.CodersController = CodersController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IGetAllCodersUsecase')),
    __param(1, (0, tsyringe_1.inject)('IFollowCodersUsecase')),
    __param(2, (0, tsyringe_1.inject)('IUnfollowCodersUsecase')),
    __param(3, (0, tsyringe_1.inject)('IGetCoderUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], CodersController);
//# sourceMappingURL=coders.controller.js.map