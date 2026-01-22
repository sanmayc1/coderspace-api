import { injectable } from 'tsyringe';
import { BaseRoute } from '../../base-route';
import { authMiddleware, userContestController } from '../../../../di/di-resolver';
import { asyncHandler } from '../../../../../shared/async-handler';

@injectable()
export class UserContestRoute extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.get(
      '/upcoming-and-ongoing',
      asyncHandler(
        userContestController.getAllUpcomingAndOngoingContests.bind(userContestController)
      )
    );

    this.router.get(
      '/past',
      asyncHandler(userContestController.getAllPastContests.bind(userContestController))
    );

    this.router.get(
      '/:id',
      asyncHandler(userContestController.getContestProblems.bind(userContestController))
    );
    this.router.post(
      '/submit/problem',
      asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
      asyncHandler(userContestController.submitProblem.bind(userContestController))
    );
    this.router.post(
      '/join',
      asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
      asyncHandler(userContestController.joinContest.bind(userContestController))
    );  
    this.router.post(
      '/finish',
      asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
      asyncHandler(userContestController.finishContest.bind(userContestController))
    );

    this.router.get(
      '/:id/leaderboard',
      asyncHandler(userContestController.getContestLeaderboard.bind(userContestController))
    );
  }
}
