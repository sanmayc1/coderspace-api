import { injectable } from 'tsyringe';
import { BaseRoute } from '../../base-route';
import { asyncHandler } from '../../../../../shared/async-handler';
import { authMiddleware, premiumGuardMiddleware, userProblemController } from '../../../../di/di-resolver';
import { optionalAuthMiddleware } from '../../../../../interfaceAdapters/middleware/optionalAuthMiddleware';

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
      asyncHandler(optionalAuthMiddleware(authMiddleware)).bind(optionalAuthMiddleware),
      asyncHandler(premiumGuardMiddleware.protect("problem")).bind(premiumGuardMiddleware),
      asyncHandler(userProblemController.getProblem.bind(userProblemController))
    );

    this.router.post(
      '/run',
      asyncHandler(userProblemController.runProblem.bind(userProblemController))
    );

    this.router.post(
      '/submit',
      asyncHandler(authMiddleware.handle(['user'])).bind(authMiddleware),
      asyncHandler(userProblemController.submitProblem.bind(userProblemController))
    );

    this.router.get(
      '/:id/updates',
      asyncHandler(authMiddleware.handle(['user'])).bind(authMiddleware),
      asyncHandler(userProblemController.getProblemUpdate.bind(userProblemController))
    );
  }
}
