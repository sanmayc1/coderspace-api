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

    this.router.patch(
      "/submit-answer",
      asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
      asyncHandler(interviewController.submitAnswer.bind(interviewController))
    )

    this.router.patch(
      "/finish-interview",
      asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
      asyncHandler(interviewController.finishInterview.bind(interviewController))
    )

    this.router.get(
      "/:sessionId/feedback",
      asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
      asyncHandler(interviewController.getInterviewFeedback.bind(interviewController))
    )
  }
}
