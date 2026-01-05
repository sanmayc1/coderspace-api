import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IGetAllCodersUsecase } from "../../../useCases/Interfaces/users/coders/get-all-coders.interface";
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from "../auth";







@injectable()
export class CodersController {

    constructor(@inject("IGetAllCodersUsecase") private _getAllCodersUsecase: IGetAllCodersUsecase){

    }

    async getAllCoders(req:Request,res:Response){
      const coders = await this._getAllCodersUsecase.execute(req.user?.accountId as string)

      res.status(HTTP_STATUS.OK).json(commonResponse(true,SUCCESS_MESSAGES.GET_ALL_CODERS,coders))
    }

}
    
