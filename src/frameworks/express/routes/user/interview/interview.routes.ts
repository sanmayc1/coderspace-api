import { injectable } from 'tsyringe';
import { BaseRoute } from '../../base-route';
import { asyncHandler } from '../../../../../shared/async-handler';
import { interviewController } from '../../../../di/di-resolver';


@injectable()
export class InterviewRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
     this.router.get('/test',asyncHandler(interviewController.test.bind(interviewController)) )
  }
}
