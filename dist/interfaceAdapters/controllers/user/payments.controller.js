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
exports.PaymentsController = void 0;
const tsyringe_1 = require("tsyringe");
const auth_1 = require("../auth");
let PaymentsController = class PaymentsController {
    _getAllPlansUseCase;
    _createRazorpayOrderUseCase;
    _verifyPaymentUseCase;
    _markFailedPaymentUseCase;
    constructor(_getAllPlansUseCase, _createRazorpayOrderUseCase, _verifyPaymentUseCase, _markFailedPaymentUseCase) {
        this._getAllPlansUseCase = _getAllPlansUseCase;
        this._createRazorpayOrderUseCase = _createRazorpayOrderUseCase;
        this._verifyPaymentUseCase = _verifyPaymentUseCase;
        this._markFailedPaymentUseCase = _markFailedPaymentUseCase;
    }
    async getAllPlans(req, res) {
        const plans = await this._getAllPlansUseCase.execute();
        res.status(auth_1.HTTP_STATUS.OK).json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.GET_ALL_PLANS, plans));
    }
    async createRazorpayOrder(req, res) {
        const { planId } = req.body;
        const order = await this._createRazorpayOrderUseCase.execute({
            accountId: req.user?.accountId,
            planId,
        });
        res
            .status(auth_1.HTTP_STATUS.OK)
            .json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.CREATE_RAZORPAY_ORDER, order));
    }
    async verifyPayment(req, res) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        await this._verifyPaymentUseCase.execute(razorpay_order_id, razorpay_payment_id, razorpay_signature, req.user?.accountId);
        res.status(auth_1.HTTP_STATUS.OK).json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.VERIFY_PAYMENT));
    }
    async markFailedPayment(req, res) {
        const { orderId } = req.body;
        await this._markFailedPaymentUseCase.execute(orderId);
        res.status(auth_1.HTTP_STATUS.OK).json((0, auth_1.commonResponse)(true, auth_1.SUCCESS_MESSAGES.MARK_FAILED_PAYMENT));
    }
};
exports.PaymentsController = PaymentsController;
exports.PaymentsController = PaymentsController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IGetAllPlansUseCase')),
    __param(1, (0, tsyringe_1.inject)('ICreateRazorpayOrderUseCase')),
    __param(2, (0, tsyringe_1.inject)('IVerifyPaymentUseCase')),
    __param(3, (0, tsyringe_1.inject)('IMarkFailedPaymentUseCase')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map