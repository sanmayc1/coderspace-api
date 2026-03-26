import { injectable } from 'tsyringe';
import { BaseRoute } from '../../base-route';
import { asyncHandler } from '../../../../../shared/async-handler';
import { authMiddleware, interviewController } from '../../../../di/di-resolver';

@injectable()
export class InterviewRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      '/',
      asyncHandler(interviewController.getAllInterviews.bind(interviewController))
    );
    this.router.post(
      '/create-session',
      asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
      asyncHandler(interviewController.createInterviewSession.bind(interviewController))
    );

    this.router.get(
      "/:sessionId/question",
      asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
      asyncHandler(interviewController.getInterviewQuestion.bind(interviewController))
    )
  }
}
