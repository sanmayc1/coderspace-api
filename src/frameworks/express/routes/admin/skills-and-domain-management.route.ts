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
     this.router.get("/domains",skillAndDomainManagementController.getAllDomains.bind(skillAndDomainManagementController))
     this.router.delete("/domain/:id",skillAndDomainManagementController.deleteDomain.bind(skillAndDomainManagementController))


     this.router.post("/skill",skillAndDomainManagementController.createSkill.bind(skillAndDomainManagementController))
     this.router.delete("/skill/:id",skillAndDomainManagementController.deleteSkill.bind(skillAndDomainManagementController))
     
    }

}