import { container } from "tsyringe";
import { IRegisterUserUsecase } from "../../entities/useCaseInterfaces/auth/register-usecase.interface.js";
import { RegisterUserUsecase } from "../../useCases/auth/registerUser.usecase.js";

export class ControllerRegistery {
  static registerControllers() {
    container.register<IRegisterUserUsecase>("IUserRegisterUsecase", {
      useClass: RegisterUserUsecase,
    });
    
  }
}
