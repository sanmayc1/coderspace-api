import { injectable } from "tsyringe";
import { BaseRoute } from "../../base-route";
import { asyncHandler } from "../../../../../shared/async-handler";
import { authMiddleware, codersController } from "../../../../di/di-resolver";


@injectable()
export class CodersRoute extends BaseRoute {
    constructor() {
        super();
    }

    protected initializeRoutes(): void {
        this.router.get(
            '/',
            asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
            asyncHandler(codersController.getAllCoders.bind(codersController))
        );

        this.router.post(
            '/follow',
            asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
            asyncHandler(codersController.followCoders.bind(codersController))
        )

        this.router.delete("/unfollow/:id",
            asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
            asyncHandler(codersController.unfollowCoders.bind(codersController))
        )

        this.router.get("/:id/coder",
            asyncHandler(authMiddleware.handle(['user']).bind(authMiddleware)),
            asyncHandler(codersController.getCoder.bind(codersController))
        )
    }
}