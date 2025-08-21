import { asyncHandler } from "../../../../shared/asyncHandler.js";
import { authcontroller } from "../../../di/di-resolver.js";
import { BaseRoute } from "../baseRoute.js";

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

    this.router.post("/login",asyncHandler(authcontroller.login.bind(authcontroller)))
  }
}
