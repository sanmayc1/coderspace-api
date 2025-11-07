import { asyncHandler } from "../../../../shared/async-handler.js";
import { authMiddleware, companyController } from "../../../di/di-resolver.js";
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
  }
}
