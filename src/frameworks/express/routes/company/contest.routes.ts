import { injectable } from 'tsyringe';
import { BaseRoute } from '../base-route';
import {  companyContestController } from '../../../di/di-resolver';

@injectable()
export class ContestRoute extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.post('/', companyContestController.createContest.bind(companyContestController));
    this.router.get('/', companyContestController.getAllContests.bind(companyContestController));

    this.router.patch('/', companyContestController.updateContest.bind(companyContestController));
    this.router.delete(
      '/:id',
      companyContestController.deleteContest.bind(companyContestController)
    );
    this.router.get(
      '/problems',
      companyContestController.getAllAvailableProblems.bind(companyContestController)
    );
    this.router.get('/:id', companyContestController.getContestById.bind(companyContestController));
  }
}
