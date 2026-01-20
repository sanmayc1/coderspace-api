import { injectable } from 'tsyringe';
import { BaseRoute } from '../base-route';
import { asyncHandler } from '../../../../shared/async-handler';
import { authMiddleware, paymentsManagementController } from '../../../di/di-resolver';

@injectable()
export class PaymentsManagementRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      '/plans',
      asyncHandler(paymentsManagementController.getAllPlans.bind(paymentsManagementController))
    );

    this.router.patch(
      '/plans/edit',
      asyncHandler(paymentsManagementController.editPlan.bind(paymentsManagementController))
    );

    this.router.get(
      '/',
      asyncHandler(paymentsManagementController.getAllPayments.bind(paymentsManagementController))
    );
  }
}
