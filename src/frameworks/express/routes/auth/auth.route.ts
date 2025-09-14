import { injectable } from "tsyringe";
import { asyncHandler } from "../../../../shared/async-handler.js";
import {
  authcontroller,
  authMiddleware,
  githubAuthController,
  googleAuthController,
  googleAuthService,
} from "../../../di/di-resolver.js";
import { BaseRoute } from "../base-route.js";
import { config } from "../../../../shared/config.js";

@injectable()
export class AuthRoute extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.post(
      "/signup",
      asyncHandler(authcontroller.signup.bind(authcontroller))
    );
    this.router.post(
      "/otp",
      asyncHandler(authcontroller.sendOtp.bind(authcontroller))
    );

    this.router.patch(
      "/verify",
      asyncHandler(authcontroller.verifyOtp.bind(authcontroller))
    );

    this.router.post(
      "/login",
      asyncHandler(authcontroller.login.bind(authcontroller))
    );

    this.router.post(
      "/password/forget",
      asyncHandler(authcontroller.forgetPasword.bind(authcontroller))
    );

    this.router.patch(
      "/password/reset",
      asyncHandler(authcontroller.resetPassword.bind(authcontroller))
    );

    this.router.post(
      "/refresh",
      asyncHandler(authcontroller.tokenRefresh.bind(authcontroller))
    );

    this.router.post(
      "/logout",
      asyncHandler(authMiddleware.handle("user").bind(authMiddleware)),
      asyncHandler(authcontroller.logout.bind(authcontroller))
    );

    this.router.get(
      "/me",
      asyncHandler(authMiddleware.handle("user").bind(authMiddleware)),
      asyncHandler(authcontroller.authenticatedUser.bind(authcontroller))
    );

    this.router.get(
      "/github/callback",
      asyncHandler(githubAuthController.githubAuth.bind(githubAuthController))
    );

    this.router.get(
      "/github",
      githubAuthController.redirectToGithub.bind(githubAuthController)
    );

    this.router.get(
      "/google",
      googleAuthService
        .getPassport()
        .authenticate("google", { scope: ["profile", "email"] })
    );

    this.router.get(
      "/google/callback",
      googleAuthService
        .getPassport()
        .authenticate("google", {
          session: false,
          failureRedirect: config.client.uri,
        }),
      asyncHandler(googleAuthController.googleAuth.bind(googleAuthController))
    );

    this.router.post(
      "/common/login",
      asyncHandler(authcontroller.companyLogin.bind(authcontroller))
    );
  }
}
