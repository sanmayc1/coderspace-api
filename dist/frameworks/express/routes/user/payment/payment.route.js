"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoute = void 0;
const base_route_1 = require("../../base-route");
const async_handler_1 = require("../../../../../shared/async-handler");
const di_resolver_1 = require("../../../../di/di-resolver");
class PaymentRoute extends base_route_1.BaseRoute {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.get('/plans', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['user'])), (0, async_handler_1.asyncHandler)(di_resolver_1.paymentController.getAllPlans.bind(di_resolver_1.paymentController)));
        this.router.post('/create/razorpay-order', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['user'])), (0, async_handler_1.asyncHandler)(di_resolver_1.paymentController.createRazorpayOrder.bind(di_resolver_1.paymentController)));
        this.router.post('/verify', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['user'])), (0, async_handler_1.asyncHandler)(di_resolver_1.paymentController.verifyPayment.bind(di_resolver_1.paymentController)));
        this.router.post('/mark-failed', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['user'])), (0, async_handler_1.asyncHandler)(di_resolver_1.paymentController.markFailedPayment.bind(di_resolver_1.paymentController)));
    }
}
exports.PaymentRoute = PaymentRoute;
//# sourceMappingURL=payment.route.js.map