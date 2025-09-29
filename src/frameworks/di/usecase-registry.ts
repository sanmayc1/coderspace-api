import { container } from "tsyringe";
import { RegisterUserUsecase } from "../../useCases/auth/register-user.usecase.js";
import { SendOtpUsecase } from "../../useCases/auth/send-otp.usercase.js";
import { VerifyOtpUsecase } from "../../useCases/auth/verify-otp.usecase.js";
import { LoginUserUsecase } from "../../useCases/auth/login-user.usecase.js";
import { RefreshTokenUsecase } from "../../useCases/auth/refresh-token.usecase.js";
import { LogoutUsecase } from "../../useCases/auth/logout.usecase.js";
import { SendRestPasswordLink } from "../../useCases/auth/send-reset-link.usecase.js";
import { ForgetPasswordUsecase } from "../../useCases/auth/forget-password.usecase.js";
import { GitHubAuthUsecase } from "../../useCases/auth/github-auth.usecase.js";
import { AuthUserUsecase } from "../../useCases/auth/auth-user.usecase.js";
import { GoogleAuthUsecase } from "../../useCases/auth/google-auth.usecase.js";
import { LoginCompanyUsecase } from "../../useCases/auth/login-company.usecase.js";
import { RegisterCompanyUsecase } from "../../useCases/auth/register-company.usecase.js";
import { GetUsersUsecase } from "../../useCases/admin/user-management/get-users.usecase.js";
import { GetUserUsecase } from "../../useCases/user/user-profile/user-profile.usecase.js";
import { UpdateSuggestionLevelUsecase } from "../../useCases/user/user-profile/update-suggestion-level.js";
import { LoginAdminUsecase } from "../../useCases/auth/login-admin.usecase.js";
import { UpdateUserUsecase } from "../../useCases/admin/user-management/update-user.usecase.js";
import { UpdateUserStatusUsecase } from "../../useCases/admin/user-management/update-user-status.usecase.js";


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
    container.register("IRegisterCompanyUsecase",{useClass:RegisterCompanyUsecase})
    container.register("IGetUsersUsecase",{useClass:GetUsersUsecase})
    container.register("IGetUserUsecase",{useClass:GetUserUsecase})
    container.register("IUpdateSuggestionLevelUsecase",{useClass:UpdateSuggestionLevelUsecase})
    container.register("ILoginAdminUsecase",{useClass:LoginAdminUsecase})
    container.register("IUpdateUserUsecase",{useClass:UpdateUserUsecase})
    container.register("IUpdateUserStatusUsecase",{useClass:UpdateUserStatusUsecase})
  }
}
