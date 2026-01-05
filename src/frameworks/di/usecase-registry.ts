import { container } from 'tsyringe';
import { RegisterUserUsecase } from '../../useCases/auth/register-user.usecase';
import { SendOtpUsecase } from '../../useCases/auth/send-otp.usercase';
import { VerifyOtpUsecase } from '../../useCases/auth/verify-otp.usecase';
import { LoginUserUsecase } from '../../useCases/auth/login-user.usecase';
import { RefreshTokenUsecase } from '../../useCases/auth/refresh-token.usecase';
import { LogoutUsecase } from '../../useCases/auth/logout.usecase';
import { SendRestPasswordLink } from '../../useCases/auth/send-reset-link.usecase';
import { ForgetPasswordUsecase } from '../../useCases/auth/forget-password.usecase';
import { GitHubAuthUsecase } from '../../useCases/auth/github-auth.usecase';
import { AuthUserUsecase } from '../../useCases/auth/auth-user.usecase';
import { GoogleAuthUsecase } from '../../useCases/auth/google-auth.usecase';
import { LoginCompanyUsecase } from '../../useCases/auth/login-company.usecase';
import { RegisterCompanyUsecase } from '../../useCases/auth/register-company.usecase';
import { GetUsersUsecase } from '../../useCases/admin/user-management/get-users.usecase';
import { GetUserUsecase } from '../../useCases/user/user-profile/user-profile.usecase';
import { UpdateSuggestionLevelUsecase } from '../../useCases/user/user-profile/update-suggestion-level';
import { LoginAdminUsecase } from '../../useCases/auth/login-admin.usecase';
import { UpdateUserUsecase } from '../../useCases/admin/user-management/update-user.usecase';
import { UpdateUserStatusUsecase } from '../../useCases/admin/user-management/update-user-status.usecase';
import { GetCompanyUsecase } from '../../useCases/company/get.company.usecase';
import { CreateDomainUsecase } from '../../useCases/admin/skills-and-domain-management/create-domain.usecase';
import { GetAllDomains } from '../../useCases/admin/skills-and-domain-management/get-all-domains.usecase';
import { DeleteDomainUsecase } from '../../useCases/admin/skills-and-domain-management/delete-domain.usecase';
import { CreateSkillUsecase } from '../../useCases/admin/skills-and-domain-management/create-skill.usecase';
import { DeleteSkillUsecase } from '../../useCases/admin/skills-and-domain-management/delete-skill.usecase';
import { GetAllSkillsUsecase } from '../../useCases/common/get-all-skills.usecase';
import { CreateProblemUsecase } from '../../useCases/admin/problem-management/create-problem.usecase';
import { GetAllProblemsUsecase } from '../../useCases/admin/problem-management/get-all-problems.usecase';
import { AddLanguageUsecase } from '../../useCases/admin/problem-management/add-language.usecase';
import { GetLanguageDetailsUsecase } from '../../useCases/admin/problem-management/get-language.details.usecase';
import { UpdateLanguageUseCase } from '../../useCases/admin/problem-management/update-language.usecase';
import { AddSingleTestcaseUsecase } from '../../useCases/admin/problem-management/add-single-testcase.usecase';
import { GetAllTestcaseUsecase } from '../../useCases/admin/problem-management/get-all-testcase.usecase';
import { DeleteTestcaseUsecase } from '../../useCases/admin/problem-management/delete-testcase.usecase';
import { GetProblemUsecase } from '../../useCases/admin/problem-management/get-problem.usecase';
import { UpdateProblemUsecase } from '../../useCases/admin/problem-management/update-problem.usecase';
import { ChangeVisibilityUsecase } from '../../useCases/admin/problem-management/change-visibility.usecase';
import { UserGetAllProblemsUsecase } from '../../useCases/user/problem/user-get-all-problem.usecase';
import { UserGetProblemUsecase } from '../../useCases/user/problem/user-get-problem.usecase';
import { UpdateCompanyUsecase } from '../../useCases/company/update-company.usecase';
import { CreateContestUsecase } from '../../useCases/company/create-contest.usecase';
import { GetCompanyContestsUsecase } from '../../useCases/company/get-company-contests.usecase';
import { UpdateUserProfileUsecase } from '../../useCases/user/user-profile/user-profile-update.usecase';
import { UpdateUserPasswordUsecase } from '../../useCases/user/user-profile/update-user-password.usecase';
import { GetAllCoders } from '../../useCases/user/coders/get-all-coders';

export class UsecaseRegistery {
  static registerUsecase() {
    container.register('IUserRegisterUsecase', {
      useClass: RegisterUserUsecase,
    });
    container.register('IVerifyOtpUsecase', { useClass: VerifyOtpUsecase });
    container.register('ISendOtpUsecase', { useClass: SendOtpUsecase });
    container.register('ILoginUserUsecase', { useClass: LoginUserUsecase });
    container.register('IRefreshTokenUsecase', {
      useClass: RefreshTokenUsecase,
    });
    container.register('ILogoutUsecase', { useClass: LogoutUsecase });
    container.register('ISendRestPasswordLink', {
      useClass: SendRestPasswordLink,
    });
    container.register('IForgetPasswordUsecase', {
      useClass: ForgetPasswordUsecase,
    });
    container.register('IGithHubAuthUsecase', { useClass: GitHubAuthUsecase });
    container.register('IAuthUserUsecase', { useClass: AuthUserUsecase });
    container.register('IGoogleAuthUsecase', { useClass: GoogleAuthUsecase });
    container.register('ILoginCompanyUsecase', {
      useClass: LoginCompanyUsecase,
    });
    container.register('IRegisterCompanyUsecase', {
      useClass: RegisterCompanyUsecase,
    });
    container.register('IGetUsersUsecase', { useClass: GetUsersUsecase });
    container.register('IGetUserUsecase', { useClass: GetUserUsecase });
    container.register('IUpdateSuggestionLevelUsecase', {
      useClass: UpdateSuggestionLevelUsecase,
    });
    container.register('ILoginAdminUsecase', { useClass: LoginAdminUsecase });
    container.register('IUpdateUserUsecase', { useClass: UpdateUserUsecase });
    container.register('IUpdateUserStatusUsecase', {
      useClass: UpdateUserStatusUsecase,
    });
    container.register('IGetCompanyUsecase', { useClass: GetCompanyUsecase });
    container.register('ICreateDomainUsecase', {
      useClass: CreateDomainUsecase,
    });
    container.register('IGetAllDomains', { useClass: GetAllDomains });
    container.register('IDeleteDomainUsecase', {
      useClass: DeleteDomainUsecase,
    });
    container.register('ICreateSkillUsecase', { useClass: CreateSkillUsecase });
    container.register('IDeleteSkillUsecase', { useClass: DeleteSkillUsecase });
    container.register('IGetAllSkillsUsecase', {
      useClass: GetAllSkillsUsecase,
    });
    container.register('ICreateProblemUsecase', {
      useClass: CreateProblemUsecase,
    });
    container.register('IGetAllProblemsUsecase', {
      useClass: GetAllProblemsUsecase,
    });
    container.register('IAddLanguageUsecase', { useClass: AddLanguageUsecase });
    container.register('IGetLanguageDetailsUsecase', {
      useClass: GetLanguageDetailsUsecase,
    });
    container.register('IUpdateLanguageUsecase', {
      useClass: UpdateLanguageUseCase,
    });
    container.register('IAddSingleTestcaseUsecase', {
      useClass: AddSingleTestcaseUsecase,
    });
    container.register('IGetAllTestcaseUsecase', {
      useClass: GetAllTestcaseUsecase,
    });
    container.register('IDeleteTestcaseUsecase', {
      useClass: DeleteTestcaseUsecase,
    });
    container.register('IGetProblemUsecase', { useClass: GetProblemUsecase });
    container.register('IUpdateProblemUsecase', {
      useClass: UpdateProblemUsecase,
    });
    container.register('IChangeVisibilityUsecase', {
      useClass: ChangeVisibilityUsecase,
    });
    container.register('IUserGetAllProblemsUsecase', {
      useClass: UserGetAllProblemsUsecase,
    });
    container.register('IUserGetProblemUsecase', {
      useClass: UserGetProblemUsecase,
    });
    container.register('IUpdateCompanyUsecase', {
      useClass: UpdateCompanyUsecase,
    });
    container.register('ICreateContestUsecase', {
      useClass: CreateContestUsecase,
    });
    container.register('IGetCompanyContestsUsecase', {
      useClass: GetCompanyContestsUsecase,
    });

    container.register('IUpdateUserProfileUsecase', {
      useClass: UpdateUserProfileUsecase,
    });

    container.register('IUpdateUserPasswordUsecase', {
      useClass: UpdateUserPasswordUsecase,
    });
    container.register('IGetAllCodersUsecase', {
      useClass: GetAllCoders,
    });
  }
}
