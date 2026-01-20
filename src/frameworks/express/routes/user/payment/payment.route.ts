import { BaseRoute } from '../../base-route';
import { asyncHandler } from '../../../../../shared/async-handler';
import { authMiddleware, paymentController } from '../../../../di/di-resolver';

export class PaymentRoute extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      '/plans',
      asyncHandler(authMiddleware.handle(['user'])),
      asyncHandler(paymentController.getAllPlans.bind(paymentController))
    );

    this.router.post(
      '/create/razorpay-order',
      asyncHandler(authMiddleware.handle(['user'])),
      asyncHandler(paymentController.createRazorpayOrder.bind(paymentController))
    );

    this.router.post(
      '/verify',
      asyncHandler(authMiddleware.handle(['user'])),
      asyncHandler(paymentController.verifyPayment.bind(paymentController))
    );

    this.router.post(
      '/mark-failed',
      asyncHandler(authMiddleware.handle(['user'])),
      asyncHandler(paymentController.markFailedPayment.bind(paymentController))
    );
  }
}
