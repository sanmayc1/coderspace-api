import {  injectable } from "tsyringe";
import { BaseRoute } from "../base-route.js";
import {
  authMiddleware,
  userManagementController,
} from "../../../di/di-resolver.js";
import { asyncHandler } from "../../../../shared/async-handler.js";

@injectable()
export class UserManagementRoute extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      "/",
      asyncHandler(authMiddleware.handle(["admin"]).bind(authMiddleware)),
      asyncHandler(
        userManagementController.getAllUsers.bind(userManagementController)
      )
    );
  }
}
