import { injectable } from 'tsyringe';
import { BaseRoute } from '../../base-route';
import { authMiddleware, chatController } from '../../../../di/di-resolver';
import { asyncHandler } from '../../../../../shared/async-handler';

@injectable()
export class ChatRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      '/',
      asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
      asyncHandler(chatController.getChats.bind(chatController))
    )

    this.router.get(
      '/:id/messages',
      asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
      asyncHandler(chatController.getChat.bind(chatController))
    )
  }
}
