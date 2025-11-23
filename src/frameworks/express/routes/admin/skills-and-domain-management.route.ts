import { injectable } from "tsyringe"
import { BaseRoute } from "../base-route.js"
import { skillAndDomainManagementController } from "../../../di/di-resolver.js"


@injectable()
export class SkillsAndDomainManagementRoute extends BaseRoute {

    constructor(){
        super()
    }

    protected initializeRoutes(): void {
     this.router.post("/domain",skillAndDomainManagementController.createDomain.bind(skillAndDomainManagementController))
    }

}