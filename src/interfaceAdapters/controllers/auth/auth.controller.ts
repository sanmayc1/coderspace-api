import { inject, injectable } from "tsyringe";
import type { IRegisterUserUsecase } from "../../../entities/useCaseInterfaces/auth/register-usecase.interface.js";
import { Request, Response } from "express";
import { UserRegisterRequestDto } from "../../dtos/auth.dto.js";
import { UserSchema } from "./validation/user-register-validation-schema.js";
import { UserMapper } from "../../mappers/user.mapper.js";

@injectable()
export class AuthController {
  constructor(
    @inject("IUserRegisterUsecase")
    private registerUsecase: IRegisterUserUsecase
  ) {}

  async signup(req: Request, res: Response, next: Function) {
    const dto: UserRegisterRequestDto = UserSchema.parse(req.body);
    const userEntity = UserMapper.toEntity(dto);
    this.registerUsecase.execute(userEntity);
    res.status(200).json({ message: "success" });
  }
}
