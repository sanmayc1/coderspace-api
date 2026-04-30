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
exports.PaymentsManagementController = void 0;
const tsyringe_1 = require("tsyringe");
const auth_1 = require("../auth");
let PaymentsManagementController = class PaymentsManagementController {
    _getAllPlansUseCase;
    _editPlanUseCase;
    _getAllPaymentsUseCase;
    constructor(_getAllPlansUseCase, _editPlanUseCase, _getAllPaymentsUseCase) {
        this._getAllPlansUseCase = _getAllPlansUseCase;
        this._editPlanUseCase = _editPlanUseCase;
        this._getAllPaymentsUseCase = _getAllPaymentsUseCase;
    }
    async getAllPlans(req, res) {
        const plans = await this._getAllPlansUseCase.execute();
        res.status(auth_1.HTTP_STATUS.OK).json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.GET_ALL_PLANS, plans));
    }
    async editPlan(req, res) {
        const data = req.body;
        await this._editPlanUseCase.execute(data);
        res.status(auth_1.HTTP_STATUS.OK).json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.UPDATED));
    }
    async getAllPayments(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort;
        const search = req.query.search;
        const result = await this._getAllPaymentsUseCase.execute(page, limit, sort, search);
        res.status(auth_1.HTTP_STATUS.OK).json({
            success: true,
            message: 'Payments fetched successfully',
            ...result,
        });
    }
};
exports.PaymentsManagementController = PaymentsManagementController;
exports.PaymentsManagementController = PaymentsManagementController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IGetAllPlansUseCase')),
    __param(1, (0, tsyringe_1.inject)('IEditPlanUseCase')),
    __param(2, (0, tsyringe_1.inject)('IGetAllPaymentsUseCase')),
    __metadata("design:paramtypes", [Object, Object, Object])
], PaymentsManagementController);
//# sourceMappingURL=payments.management.controller.js.map