import { injectable } from 'tsyringe';
import { BaseRoute } from '../base-route';
import { asyncHandler } from '../../../../shared/async-handler';
import { interviewManagementAdminController } from '../../../di/di-resolver';

@injectable()
export class InterviewAdminRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.post(
      '/create',
      asyncHandler(
        interviewManagementAdminController.createInterview.bind(interviewManagementAdminController)
      )
    );

    this.router.get(
      '/',
      asyncHandler(
        interviewManagementAdminController.getAllInterviews.bind(interviewManagementAdminController)
      )
    );

    this.router.delete(
      '/:id/delete',
      asyncHandler(
        interviewManagementAdminController.deleteInterview.bind(interviewManagementAdminController)
      )
    );
  }
}
