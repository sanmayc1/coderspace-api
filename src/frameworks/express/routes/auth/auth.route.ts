import { authcontroller } from "../../../di/di-resolver.js";
import { BaseRoute } from "../baseRoute.js";

export class AuthRoute extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.post("/signup",authcontroller.signup.bind(authcontroller));
  }
}
