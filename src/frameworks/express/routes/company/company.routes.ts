import { asyncHandler } from '../../../../shared/async-handler';
import {
  authMiddleware,
  companyController,
  companyContestController,
  contestRoutes,
} from '../../../di/di-resolver';
import { BaseRoute } from '../base-route';

export class CompanyRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      '/',
      asyncHandler(authMiddleware.handle(['company'])).bind(authMiddleware),
      companyController.getCompany.bind(companyController)
    );

    this.router.patch(
      '/',
      asyncHandler(authMiddleware.handle(['company'])).bind(authMiddleware),
      companyController.updateProfile.bind(companyController)
    );

    this.router.use('/contests',asyncHandler(authMiddleware.handle(['company'])).bind(authMiddleware), contestRoutes.router);

    
  }
}
