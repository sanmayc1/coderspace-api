import { Request, Response } from "express";
import { injectable } from "tsyringe";





@injectable()
export class ProblemManagementController {

    constructor(){}

  
  async  createProblem(req:Request,res:Response){
        console.log(req.body)

    }
    
}