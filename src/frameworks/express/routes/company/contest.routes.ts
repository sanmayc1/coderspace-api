import { injectable } from 'tsyringe';
import { BaseRoute } from '../base-route';
import { asyncHandler } from '../../../../shared/async-handler';
import { authMiddleware, companyContestController } from '../../../di/di-resolver';

@injectable()
export class ContestRoute extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.post('/', companyContestController.createContest.bind(companyContestController));
    this.router.get('/', companyContestController.getAllContests.bind(companyContestController));
    this.router.get('/:id', companyContestController.getContestById.bind(companyContestController));
  }
}
