import { injectable } from "tsyringe";
import { BaseRoute } from "../base-route.js";
import { asyncHandler } from "../../../../shared/async-handler.js";
import {
  authMiddleware,
  problemRoutes,
  userProfileController,
} from "../../../di/di-resolver.js";
import { upload } from "../../../../shared/utils/multer.js";

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

    this.router.patch(
      "/",
      upload.single("profileImage"),
      asyncHandler(authMiddleware.handle(["user"]).bind(authMiddleware)),
      asyncHandler(
        userProfileController.updateUserProfile.bind(userProfileController)
      )
    );

    this.router.patch(
      "/password",
      asyncHandler(authMiddleware.handle(["user"]).bind(authMiddleware)),
      asyncHandler(
        userProfileController.updatePassword.bind(userProfileController)
      )
    );

    this.router.use("/problems", problemRoutes.router);
  }
}
