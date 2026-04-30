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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const auth_1 = require("../controllers/auth");
const crypto_1 = __importDefault(require("crypto"));
let PaymentService = class PaymentService {
    razorpay;
    constructor(razorpay = new razorpay_1.default({
        key_id: auth_1.config.razorpay.apiKey,
        key_secret: auth_1.config.razorpay.secert,
    })) {
        this.razorpay = razorpay;
    }
    async createRazorpayOrder(amount) {
        return await this.razorpay.orders.create({
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        });
    }
    async verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
        const generatedSignature = crypto_1.default
            .createHmac('sha256', auth_1.config.razorpay.secert)
            .update(`${razorpayOrderId}|${razorpayPaymentId}`)
            .digest('hex');
        const isVerified = generatedSignature === razorpaySignature;
        if (!isVerified)
            return false;
        const payment = await this.razorpay.payments.fetch(razorpayPaymentId);
        return payment.status === 'captured';
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, auth_1.injectable)(),
    __metadata("design:paramtypes", [Object])
], PaymentService);
//# sourceMappingURL=payment.service.js.map