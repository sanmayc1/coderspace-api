import { injectable } from "tsyringe";
import { BaseRoute } from "../base-route.js";
import { asyncHandler } from "../../../../shared/async-handler.js";
import {
  authMiddleware,
  userProfileController,
} from "../../../di/di-resolver.js";

@injectable()
export class UserRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      "/",
      asyncHandler(authMiddleware.handle(["user"]).bind(authMiddleware)),
      asyncHandler(userProfileController.getUser.bind(userProfileController))
    );

    this.router.patch(
      "/suggestion/level",
      asyncHandler(authMiddleware.handle(["user"]).bind(authMiddleware)),
      asyncHandler(
        userProfileController.updateSuggestionLevel.bind(userProfileController)
      )
    );
  }
}
