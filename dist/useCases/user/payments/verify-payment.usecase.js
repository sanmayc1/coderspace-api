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
exports.VerifyPaymentUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const constant_1 = require("../../../shared/constant");
const custom_error_1 = require("../../../domain/utils/custom-error");
let VerifyPaymentUseCase = class VerifyPaymentUseCase {
    _paymentRepository;
    _paymentService;
    _userRepository;
    _planRepository;
    constructor(_paymentRepository, _paymentService, _userRepository, _planRepository) {
        this._paymentRepository = _paymentRepository;
        this._paymentService = _paymentService;
        this._userRepository = _userRepository;
        this._planRepository = _planRepository;
    }
    async execute(razorpayOrderId, razorpayPaymentId, razorpaySignature, accountId) {
        const payment = await this._paymentRepository.findByRazorpayOrderId(razorpayOrderId);
        if (!payment) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.PAYMENT_NOT_FOUND);
        }
        const isVerified = await this._paymentService.verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature);
        if (!isVerified) {
            await this._paymentRepository.updatePaymentByRazorpayOrderId(razorpayOrderId, {
                status: 'failed',
            });
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.PAYMENT_VERIFICATION_FAILED);
        }
        const user = await this._userRepository.findByAccountId(accountId);
        if (!user) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.USER_NOT_FOUND);
        }
        const plan = await this._planRepository.findById(payment.planId);
        if (!plan) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.BAD_REQUEST, constant_1.ERROR_MESSAGES.PLAN_NOT_FOUND);
        }
        const now = new Date();
        if (user.subscription && user.subscription.endDate > now) {
            const startDate = user.subscription.startDate;
            const endDate = new Date(user.subscription.endDate);
            endDate.setMonth(endDate.getMonth() + plan.durationInMonths);
            await this._userRepository.updateById(user._id, {
                subscription: {
                    planId: payment.planId,
                    startDate,
                    endDate,
                },
            });
        }
        else {
            const startDate = now;
            const endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + plan.durationInMonths);
            await this._userRepository.updateById(user._id, {
                subscription: {
                    planId: payment.planId,
                    startDate,
                    endDate,
                },
            });
        }
        await this._paymentRepository.updatePaymentByRazorpayOrderId(razorpayOrderId, {
            razorpayPaymentId,
            status: 'success',
        });
    }
};
exports.VerifyPaymentUseCase = VerifyPaymentUseCase;
exports.VerifyPaymentUseCase = VerifyPaymentUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IPaymentRepository')),
    __param(1, (0, tsyringe_1.inject)('IPaymentService')),
    __param(2, (0, tsyringe_1.inject)('IUserRepository')),
    __param(3, (0, tsyringe_1.inject)('IPlanRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], VerifyPaymentUseCase);
//# sourceMappingURL=verify-payment.usecase.js.map