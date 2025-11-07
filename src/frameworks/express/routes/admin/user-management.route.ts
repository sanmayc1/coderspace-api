import { injectable } from "tsyringe";
import { BaseRoute } from "../base-route.js";
import {

  
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
      asyncHandler(
        userManagementController.getAllUsers.bind(userManagementController)
      )
    );
    this.router.patch(
      "/:id",
      asyncHandler(
        userManagementController.updateUserProfile.bind(
          userManagementController
        )
      )
    );

    this.router.patch(
      "/:id/status",
      asyncHandler(
        userManagementController.updateUserStatus.bind(userManagementController)
      )
    );
  }
}
