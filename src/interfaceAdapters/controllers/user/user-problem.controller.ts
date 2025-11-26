import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IUserGetAllProblemsUsecase } from "../../../useCases/Interfaces/users/problem/user-get-all-problems.usecase.interface.js";
import { mongoObjectIdSchema, querySchema } from "../admin/validation/schema.js";
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from "../auth/index.js";
import { IUserGetProblemUsecase } from "../../../useCases/Interfaces/users/problem/user-get-problem.usecase.interface.js";




@injectable()
export class UserProblemController {
    constructor(@inject("IUserGetAllProblemsUsecase") private _userGetAllProblemsUsecase:IUserGetAllProblemsUsecase,
     @inject("IUserGetProblemUsecase") private _userGetProblemUsecase:IUserGetProblemUsecase
){}

    async getAllProblems(req:Request,res:Response){
      
        const validatedQurey = querySchema.parse(req.query)

      const response =  await this._userGetAllProblemsUsecase.execute(validatedQurey)
       
      res.status(HTTP_STATUS.OK).json(commonResponse(true,SUCCESS_MESSAGES.GET_ALL_PROBLEMS,response))
       
     }

     async getProblem(req:Request,res:Response){
        const {id} = req.params

        const validated = mongoObjectIdSchema.parse({id})

        const response = await this._userGetProblemUsecase.execute(validated.id)


        res.status(HTTP_STATUS.OK).json(commonResponse(true,SUCCESS_MESSAGES.GET_PROBLEM,response))


     }

}
