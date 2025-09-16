import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IGetUsersUsecase } from "../../../useCases/Interfaces/admin/user-management/get-users.usecase.interface.js";
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from "../auth/index.js";




@injectable()
export class UserManagementController {
 constructor(@inject("IGetUsersUsecase") private _getUsersUsecase:IGetUsersUsecase){}

 async getAllUsers(req:Request,res:Response){
  const {page=0,sort='a-z'} = req.body
   const users = await this._getUsersUsecase.execute({page,sort})
   res.status(HTTP_STATUS.OK).json(commonResponse(true,SUCCESS_MESSAGES.USERS_FETCHED,users))
 }

}