import { asyncHandler } from "../../../../shared/async-handler.js";
import { authMiddleware, commonController } from "../../../di/di-resolver.js";
import { BaseRoute } from "../base-route.js";

export class CommonRoute extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      "/skills",
      asyncHandler(commonController.getAllSkills.bind(commonController))
    );
  }
}
