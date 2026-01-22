import { injectable } from 'tsyringe';
import { BaseRoute } from '../base-route';
import { asyncHandler } from '../../../../shared/async-handler';
import {
  authMiddleware,
  codersRoutes,
  contestRoutes,
  paymentRoutes,
  problemRoutes,
  userContestRoutes,
  userProfileController,
} from '../../../di/di-resolver';
import { upload } from '../../../../shared/utils/multer';

@injectable()
export class UserRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      '/',
      asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
      asyncHandler(userProfileController.getUser.bind(userProfileController))
    );

    this.router.patch(
      '/suggestion/level',
      asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
      asyncHandler(userProfileController.updateSuggestionLevel.bind(userProfileController))
    );

    this.router.patch(
      '/',
      upload.single('profileImage'),
      asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
      asyncHandler(userProfileController.updateUserProfile.bind(userProfileController))
    );

    this.router.patch(
      '/password',
      asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
      asyncHandler(userProfileController.updatePassword.bind(userProfileController))
    );

    this.router.use('/problems', problemRoutes.router);
    this.router.use('/coders', codersRoutes.router);
    this.router.use('/payments', paymentRoutes.router);
    this.router.use('/contests', userContestRoutes.router);
  }
}
