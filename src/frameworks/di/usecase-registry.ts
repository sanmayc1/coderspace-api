import { container } from "tsyringe";
import { RegisterUserUsecase } from "../../useCases/auth/register-user.usecase.js";
import { SendOtpUsecase } from "../../useCases/auth/send-otp.usercase.js";
import { VerifyOtpUsecase } from "../../useCases/auth/verify-otp.usecase.js";
import { LoginUserUsecase } from "../../useCases/auth/login-user.usecase.js";
import { RefreshTokenUsecase } from "../../useCases/auth/refresh-tokenUsecase.js";
import { LogoutUsecase } from "../../useCases/auth/logout.usecase.js";
import { SendRestPasswordLink } from "../../useCases/auth/send-reset-link.usecase.js";
import { ForgetPasswordUsecase } from "../../useCases/auth/forget-password.usecase.js";
import { GitHubAuthUsecase } from "../../useCases/auth/github-auth.usecase.js";
import { AuthUserUsecase } from "../../useCases/auth/auth-user.usecase.js";
import { GoogleAuthUsecase } from "../../useCases/auth/google-auth.usecase.js";
import { LoginCompanyUsecase } from "../../useCases/auth/login-company.usecase.js";


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
    container.register("ILogoutUsecase", { useClass: LogoutUsecase });
    container.register("ISendRestPasswordLink",{useClass:SendRestPasswordLink})
    container.register("IForgetPasswordUsecase",{useClass:ForgetPasswordUsecase})
    container.register("IGithHubAuthUsecase",{useClass:GitHubAuthUsecase})
    container.register("IAuthUserUsecase",{useClass:AuthUserUsecase})
    container.register("IGoogleAuthUsecase",{useClass:GoogleAuthUsecase})
    container.register("ILoginCompanyUsecase",{useClass:LoginCompanyUsecase})
  }
}
