import { container } from "tsyringe";
import { RegisterUserUsecase } from "../../useCases/auth/register-user.usecase.js";
import { SendOtpUsecase } from "../../useCases/auth/send-otp.usercase.js";
import { VerifyOtpUsecase } from "../../useCases/auth/verify-otp.usecase.js";
import { LoginUserUsecase } from "../../useCases/auth/login-user.usecase.js";
import { RefreshTokenUsecase } from "../../useCases/auth/refresh-tokenUsecase.js";

export class UsecaseRegistery {
  static registerUsecase() {
    container.register("IUserRegisterUsecase", {
      useClass: RegisterUserUsecase,
    });
    container.register("IVerifyOtpUsecase", { useClass: VerifyOtpUsecase });
    container.register("ISendOtpUsecase", { useClass: SendOtpUsecase });
    container.register("ILoginUserUsecase", { useClass: LoginUserUsecase });
    container.register("IRefreshTokenUsecase", {
      useClass: RefreshTokenUsecase,
    });
  }
}
