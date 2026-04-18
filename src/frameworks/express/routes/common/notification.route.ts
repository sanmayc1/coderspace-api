import { injectable } from 'tsyringe';
import { BaseRoute } from '../base-route';
import { notificationController, authMiddleware } from '../../../di/di-resolver';
import { asyncHandler } from '../../../../shared/async-handler';

@injectable()
export class NotificationRoute extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      '/',
      asyncHandler(authMiddleware.handle(['user', 'company']).bind(authMiddleware)),
      asyncHandler(notificationController.getNotifications.bind(notificationController))
    );

    this.router.put(
      '/mark-all-read',
      asyncHandler(authMiddleware.handle(['user', 'company']).bind(authMiddleware)),
      asyncHandler(notificationController.markAsRead.bind(notificationController))
    );
  }
}
