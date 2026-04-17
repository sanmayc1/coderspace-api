import { injectable } from 'tsyringe';
import { BaseRoute } from '../base-route';
import { adminDashboardController } from '../../../di/di-resolver';
import { asyncHandler } from '../../../../shared/async-handler';

@injectable()
export class AdminDashboardRoute extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get('/', asyncHandler(adminDashboardController.getDashboardStats.bind(adminDashboardController)));
  }
}
