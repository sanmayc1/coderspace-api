import { inject, injectable } from "tsyringe";
import type { IRegisterUserUsecase } from "../../../entities/useCaseInterfaces/auth/register-usecase.interface.js";
import { Request, Response } from "express";
import { UserRegisterRequestDto } from "../../dtos/auth.dto.js";
import { UserSchema } from "./validation/user-register-validation-schema.js";
import { UserMapper } from "../../mappers/user.mapper.js";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constant.js";
import { success } from "zod";

@injectable()
export class AuthController {
  constructor(
    @inject("IUserRegisterUsecase")
    private registerUsecase: IRegisterUserUsecase
  ) {}

  async signup(req: Request, res: Response, next: Function) {
    const dto: UserRegisterRequestDto = UserSchema.parse(req.body);
    const userEntity = UserMapper.toEntity(dto);
    await this.registerUsecase.execute(userEntity);
    res.status(HTTP_STATUS.OK).json({success:true,message:SUCCESS_MESSAGES.USER_REGISTERED});
  }
}
