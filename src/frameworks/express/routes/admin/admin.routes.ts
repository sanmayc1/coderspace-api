import { injectable } from 'tsyringe';
import { BaseRoute } from '../base-route';
import {
  authMiddleware,
  paymentRoutes,
  paymentsManagementRoutes,
  problemManagementRoutes,
  skillsAndDomainManagementRoute,
  userManagementRoute,
} from '../../../di/di-resolver';
import { asyncHandler } from '../../../../shared/async-handler';

@injectable()
export class AdminRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.use(
      '/users',
      asyncHandler(authMiddleware.handle(['admin']).bind(authMiddleware)),
      userManagementRoute.router
    );
    this.router.use(
      '/problems',
      asyncHandler(authMiddleware.handle(['admin']).bind(authMiddleware)),
      problemManagementRoutes.router
    );
    this.router.use(
      '/',
      asyncHandler(authMiddleware.handle(['admin', 'company'])).bind(authMiddleware),
      skillsAndDomainManagementRoute.router
    );

    this.router.use(
      '/payments',
      asyncHandler(authMiddleware.handle(['admin']).bind(authMiddleware)),
      paymentsManagementRoutes.router
    );

  }
}
