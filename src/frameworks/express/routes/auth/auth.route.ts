import { BaseRoute } from "../baseRoute.js";

export class AuthRoute extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.post("/signup", (req, res) => {
      console.log(req.body);
      res.status(200).json({ message: req.body });
    });
  }
}
