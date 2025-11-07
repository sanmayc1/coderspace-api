import { injectable } from "tsyringe";
import { BaseRoute } from "../base-route.js";
import { authMiddleware, userManagementRoute } from "../../../di/di-resolver.js";
import { asyncHandler } from "../../../../shared/async-handler.js";

@injectable()
export class AdminRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.use("/users",asyncHandler(authMiddleware.handle(["admin"]).bind(authMiddleware)), userManagementRoute.router);
  }
}
