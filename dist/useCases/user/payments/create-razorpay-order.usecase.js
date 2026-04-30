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
exports.CreateRazorpayOrderUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const custom_error_1 = require("../../../domain/utils/custom-error");
const constant_1 = require("../../../shared/constant");
let CreateRazorpayOrderUseCase = class CreateRazorpayOrderUseCase {
    _paymentService;
    _planRepository;
    _accountRepository;
    _paymentRepository;
    _userRepository;
    constructor(_paymentService, _planRepository, _accountRepository, _paymentRepository, _userRepository) {
        this._paymentService = _paymentService;
        this._planRepository = _planRepository;
        this._accountRepository = _accountRepository;
        this._paymentRepository = _paymentRepository;
        this._userRepository = _userRepository;
    }
    async execute(data) {
        const plan = await this._planRepository.findById(data.planId);
        if (!plan) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.OK, constant_1.ERROR_MESSAGES.PLAN_NOT_FOUND);
        }
        const account = await this._accountRepository.findById(data.accountId);
        if (!account) {
            throw new custom_error_1.CustomError(constant_1.HTTP_STATUS.OK, constant_1.ERROR_MESSAGES.USER_NOT_FOUND);
        }
        const order = await this._paymentService.createRazorpayOrder(plan.price);
        await this._paymentRepository.create({
            razorpayOrderId: order.id,
            amount: plan.price,
            currency: order.currency,
            userId: account._id,
            planId: data.planId,
        });
        return {
            orderId: order.id,
            amount: String(plan.price),
            currency: order.currency,
            name: account.name,
            email: account.email,
        };
    }
};
exports.CreateRazorpayOrderUseCase = CreateRazorpayOrderUseCase;
exports.CreateRazorpayOrderUseCase = CreateRazorpayOrderUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IPaymentService')),
    __param(1, (0, tsyringe_1.inject)('IPlanRepository')),
    __param(2, (0, tsyringe_1.inject)('IAccountRepository')),
    __param(3, (0, tsyringe_1.inject)('IPaymentRepository')),
    __param(4, (0, tsyringe_1.inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], CreateRazorpayOrderUseCase);
//# sourceMappingURL=create-razorpay-order.usecase.js.map