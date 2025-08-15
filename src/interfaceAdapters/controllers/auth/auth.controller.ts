import { inject, injectable } from "tsyringe";
import type { IUserResgisterUseCase } from "../../../entities/useCaseInterfaces/auth/register-usecase.interface.js";

@injectable()
class AuthController {
  constructor(
    @inject("IUserRegisterUsecase")
    private registerUsecase: IUserResgisterUseCase
  ) {}
  
}
