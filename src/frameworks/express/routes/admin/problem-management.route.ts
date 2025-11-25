import { injectable } from "tsyringe";
import { BaseRoute } from "../base-route.js";
import { Request, Response } from "express";
import { problemManagementController } from "../../../di/di-resolver.js";




@injectable()
export class ProblemManagementRoutes extends BaseRoute {

    constructor(){
        super()
    }

    protected initializeRoutes(): void {
      this.router.post('/',problemManagementController.createProblem.bind(problemManagementController))
      this.router.get('/',problemManagementController.getAllProblems.bind(problemManagementController))
      this.router.post("/language",problemManagementController.addLanguage.bind(problemManagementController))
    }

}