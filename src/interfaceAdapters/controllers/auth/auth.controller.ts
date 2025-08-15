import { inject, injectable } from "tsyringe";
import type { IRegisterUserUsecase } from "../../../entities/useCaseInterfaces/auth/register-usecase.interface.js";
import { Request, Response } from "express";
import { UserRegisterRequestDto } from "../../../shared/dtos/auth.dto.js";

@injectable()
export class AuthController {
  constructor(
    @inject("IUserRegisterUsecase")
    private registerUsecase: IRegisterUserUsecase
  ) {}

  signup(req:Request,res:Response,next:Function){

    this.registerUsecase.execute(req.body as UserRegisterRequestDto)
  }

}
