import { success } from "zod";
import { asyncHandler } from "../../../../shared/async-handler.js";
import { authcontroller, authMiddleware } from "../../../di/di-resolver.js";
import { BaseRoute } from "../base-route.js";
import { tr } from "zod/locales";

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
      asyncHandler(
        authcontroller.forgetPasword.bind(authcontroller)
      )
    );

     this.router.patch(
      "/password/reset",
      asyncHandler(
        authcontroller.resetPassword.bind(authcontroller)
      )
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
  }
}
