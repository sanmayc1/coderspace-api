import { injectable } from 'tsyringe';
import { BaseRoute } from '../base-route';
import { companyManagementController } from '../../../di/di-resolver';
import { asyncHandler } from '../../../../shared/async-handler';

@injectable()
export class CompanyManagementRoute extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      '/',
      asyncHandler(companyManagementController.getAllCompanies.bind(companyManagementController))
    );
    this.router.patch(
      '/:id/verify',
      asyncHandler(companyManagementController.verifyCompany.bind(companyManagementController))
    );
    this.router.patch(
      '/:id/reject',
      asyncHandler(companyManagementController.rejectCompany.bind(companyManagementController))
    );
  }
}
