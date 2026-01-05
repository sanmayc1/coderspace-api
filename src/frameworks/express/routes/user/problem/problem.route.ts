import { injectable } from 'tsyringe';
import { BaseRoute } from '../../base-route';
import { asyncHandler } from '../../../../../shared/async-handler';
import { userProblemController } from '../../../../di/di-resolver';

@injectable()
export class ProblemRoute extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      '/',
      asyncHandler(userProblemController.getAllProblems.bind(userProblemController))
    );

    this.router.get(
      '/:id',
      asyncHandler(userProblemController.getProblem.bind(userProblemController))
    );
  }
}
