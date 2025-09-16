import { injectable } from "tsyringe";
import { BaseRoute } from "../base-route.js";
import { userManagementRoute } from "../../../di/di-resolver.js";

@injectable()
export class AdminRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.use("/users", userManagementRoute.router);
  }
}
