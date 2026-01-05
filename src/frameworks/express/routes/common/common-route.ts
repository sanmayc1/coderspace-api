import { asyncHandler } from '../../../../shared/async-handler';
import { authMiddleware, commonController } from '../../../di/di-resolver';
import { BaseRoute } from '../base-route';

export class CommonRoute extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get('/skills', asyncHandler(commonController.getAllSkills.bind(commonController)));
  }
}
