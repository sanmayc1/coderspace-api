import { BaseRoute } from "../baseRoute.js";

export class UserRoutes extends BaseRoute {
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
       this.router.post("/")
    }

}