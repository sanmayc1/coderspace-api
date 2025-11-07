import { injectable } from "tsyringe";
import { asyncHandler } from "../../../../shared/async-handler.js";
import {
  authController,
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
      asyncHandler(authController.signup.bind(authController))
    );
    this.router.post(
      "/otp",
      asyncHandler(authController.sendOtp.bind(authController))
    );

    this.router.patch(
      "/verify",
      asyncHandler(authController.verifyOtp.bind(authController))
    );

    this.router.post(
      "/login",
      asyncHandler(authController.login.bind(authController))
    );

    this.router.post(
      "/password/forget",
      asyncHandler(authController.forgetPasword.bind(authController))
    );

    this.router.patch(
      "/password/reset",
      asyncHandler(authController.resetPassword.bind(authController))
    );

    this.router.post(
      "/refresh",
      asyncHandler(authController.tokenRefresh.bind(authController))
    );

    this.router.post(
      "/logout",
      // asyncHandler(authMiddleware.handle(["admin","company","user"]).bind(authMiddleware)), 
      asyncHandler(authController.logout.bind(authController))
    );

    this.router.get(
      "/me",
      asyncHandler(authMiddleware.handle(["user","admin","company"]).bind(authMiddleware)),
      asyncHandler(authController.authenticatedUser.bind(authController))
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
      "/company/login",
      asyncHandler(authController.companyLogin.bind(authController))
    );

        this.router.post(
      "/admin/login",
      asyncHandler(authController.adminLogin.bind(authController))
    );

    this.router.post("/company/register",
      asyncHandler(authController.companyRegister.bind(authController))
    )
  }
}
