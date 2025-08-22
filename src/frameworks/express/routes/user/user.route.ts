import { BaseRoute } from "../base-route.js";

export class UserRoutes extends BaseRoute {
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
       this.router.post("/")
    }

}