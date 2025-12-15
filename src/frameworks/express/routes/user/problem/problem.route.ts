import { injectable } from "tsyringe";
import { BaseRoute } from "../../base-route.js";
import { asyncHandler } from "../../../../../shared/async-handler.js";
import { userProblemController } from "../../../../di/di-resolver.js";

@injectable()
export class ProblemRoute extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      "/",
      asyncHandler(
        userProblemController.getAllProblems.bind(userProblemController)
      )
    );

    this.router.get(
      "/:id",
      asyncHandler(userProblemController.getProblem.bind(userProblemController))
    );
  }
}
