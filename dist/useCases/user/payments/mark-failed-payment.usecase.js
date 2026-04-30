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
exports.MarkFailedPaymentUseCase = void 0;
const tsyringe_1 = require("tsyringe");
let MarkFailedPaymentUseCase = class MarkFailedPaymentUseCase {
    _paymentRepository;
    constructor(_paymentRepository) {
        this._paymentRepository = _paymentRepository;
    }
    async execute(orderId) {
        const payment = await this._paymentRepository.findByRazorpayOrderId(orderId);
        if (!payment) {
            throw new Error('Payment not found');
        }
        await this._paymentRepository.updatePaymentByRazorpayOrderId(orderId, { status: 'failed' });
    }
};
exports.MarkFailedPaymentUseCase = MarkFailedPaymentUseCase;
exports.MarkFailedPaymentUseCase = MarkFailedPaymentUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IPaymentRepository')),
    __metadata("design:paramtypes", [Object])
], MarkFailedPaymentUseCase);
//# sourceMappingURL=mark-failed-payment.usecase.js.map