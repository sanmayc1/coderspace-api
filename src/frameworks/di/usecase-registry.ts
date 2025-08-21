import { container } from "tsyringe";
import { RegisterUserUsecase } from "../../useCases/auth/registerUser.usecase.js";
import { SendOtpUsecase } from "../../useCases/auth/sendOtp.usercase.js";
import { VerifyOtpUsecase } from "../../useCases/auth/verifyOtp.usecase.js";
import { LoginUserUsecase } from "../../useCases/auth/loginUser.usecase.js";

export class UsecaseRegistery {
  static registerUsecase() {
    container.register("IUserRegisterUsecase", {
      useClass: RegisterUserUsecase,
    });
    container.register("IVerifyOtpUsecase", { useClass: VerifyOtpUsecase });
    container.register("ISendOtpUsecase", { useClass: SendOtpUsecase });
    container.register("ILoginUserUsecase", { useClass: LoginUserUsecase });
  }
}
