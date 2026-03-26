import { asyncHandler } from '../../../../shared/async-handler';
import { authMiddleware, commonController } from '../../../di/di-resolver';
import { BaseRoute } from '../base-route';

export class CommonRoute extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get('/skills', asyncHandler(commonController.getAllSkills.bind(commonController)));

    this.router.get(
      '/contest/:id/leaderboard',
      asyncHandler(authMiddleware.handle(['company', 'user']).bind(authMiddleware)),
      asyncHandler(commonController.getContestLeaderboard.bind(commonController))
    );

    this.router.patch(
      '/change-password',
      asyncHandler(authMiddleware.handle(['company', 'admin']).bind(authMiddleware)),
      asyncHandler(commonController.changeAccountPassword.bind(commonController))
    )
  }
}
