import { inject, injectable } from "tsyringe";
import {
  IGithHubAuthUsecase,
  IGithHubAuthUsecaseOutput,
} from "../../entities/useCaseInterfaces/auth/github-auth.usecase.interface.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IGitHubAuthService } from "../../entities/services/github-auth-service.interface.js";
import { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import { IWalletRepository } from "../../entities/repositoryInterfaces/wallet-repository.interface.js";
import { IJwtService } from "../../entities/services/jwt-service.interface.js";
import { IUniqueIdService } from "../../entities/services/uuid.interface.js";
import { ITokenRepository } from "../../entities/repositoryInterfaces/token-repository.interface.js";
import { IUserEntity } from "../../entities/models/user.entity.js";
import { IAccountsRepository } from "../../entities/repositoryInterfaces/accounts-repository.interface.js";

@injectable()
export class GithHubAuthUsecase implements IGithHubAuthUsecase {
  constructor(
    @inject("IGitHubAuthService")
    private _githubAuthService: IGitHubAuthService,
    @inject("IUserRepository") private _userRepo: IUserRepository,
    @inject("IWalletRepository") private _walletRepo: IWalletRepository,
    @inject("IJwtService") private _jwtService: IJwtService,
    @inject("IUniqueIdService") private _uniqueIdService: IUniqueIdService,
    @inject("ITokenRepository") private _tokenRepo: ITokenRepository,
    @inject("IAccountRepository")
    private _accountRepository: IAccountsRepository
  ) {}
  async execute(
    sessionState: string,
    state: string,
    code: string
  ): Promise<IGithHubAuthUsecaseOutput> {
    if (state !== sessionState) {
      return {
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.INVALID_AUTH_STATE,
      };
    }

    const token = await this._githubAuthService.exchangeToken(code);
    if (token === null) {
      return {
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.INVALID_AUTH_CODE,
      };
    }

    const user = await this._githubAuthService.getUserProfile(token);

    let existingUser = await this._accountRepository.findByEmail(user.email);

    if (!existingUser) {
      let baseUsername = `@${user.email.split("@")[0]}`;
      let username: string = "";
      let exists: any = true;
      while (exists) {
        let ending = Math.floor(Math.random() * 1000 + 9000);
        username = baseUsername + ending;
        exists = await this._userRepo.findByUsername(username);
      }

      const newUser: Partial<IUserEntity> = {
        email: user.email,
        username,
        name: user.name,
        authProvider: "github",
        ...(user.avatar_url && { profileUrl: user.avatar_url }),
        ...(user.html_url && { githubUrl: user.html_url }),
        ...(user.location && { location: user.location }),
      };

      existingUser = await this._userRepo.save(newUser);
      await this._walletRepo.create(existingUser._id, "user");
    } else if (existingUser.authProvider !== "github") {
      return {
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.INVALID_AUTH_PROVIDER,
      };
    }

    const accessToken = this._jwtService.signAccess({
      userId: existingUser._id,
      role: existingUser.role as string,
      isProfileComplete: existingUser.isProfileComplete,
    });

    const refreshToken = this._jwtService.signRefresh({
      userId: existingUser._id,
      role: existingUser.role as string,
      isProfileComplete: existingUser.isProfileComplete,
    });

    const deviceId = this._uniqueIdService.generate();
    const payload = this._jwtService.verifyRefresh(refreshToken);

    const expire = new Date((payload?.exp ?? 0) * 1000);

    await this._tokenRepo.saveToken(
      existingUser._id,
      deviceId,
      refreshToken,
      expire
    );

    return {
      statusCode: HTTP_STATUS.OK,
      accessToken,
      refreshToken,
      deviceId,
    };
  }
}
