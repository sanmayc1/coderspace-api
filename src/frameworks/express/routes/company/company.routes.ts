import { asyncHandler } from "../../../../shared/async-handler.js";
import { authMiddleware, companyController, companyContestController } from "../../../di/di-resolver.js";
import { BaseRoute } from "../base-route.js";

export class CompanyRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      "/",
      asyncHandler(authMiddleware.handle(["company"])).bind(authMiddleware),
      companyController.getCompany.bind(companyController)
    );

    this.router.patch(
      "/",
      asyncHandler(authMiddleware.handle(["company"])).bind(authMiddleware),
      companyController.updateProfile.bind(companyController)
    );

    this.router.post(
      "/contests",
      asyncHandler(authMiddleware.handle(["company"])).bind(authMiddleware),
      companyContestController.createContest.bind(companyContestController)
    );

    this.router.get(
      "/contests",
      asyncHandler(authMiddleware.handle(["company"])).bind(authMiddleware),
      companyContestController.getContests.bind(companyContestController)
    );

  }
}
