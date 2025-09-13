import { inject, injectable } from "tsyringe";
import { ILoginUserUsecase } from "../Interfaces/auth/login-user.usecase.interface.js";
import { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import { CustomError } from "../../entities/utils/errors/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IBcrypt } from "../../entities/services/bcrypt.interface.js";
import { IJwtService } from "../../entities/services/jwt-service.interface.js";
import { IUniqueIdService } from "../../entities/services/uuid.interface.js";
import { ITokenRepository } from "../../entities/repositoryInterfaces/token-repository.interface.js";
import { IAccountsRepository } from "../../entities/repositoryInterfaces/accounts-repository.interface.js";
import { IAccountsEntity } from "../../entities/models/accounts-entity.js";
import { registerUserUsecaseMapper } from "../mappers/register.usecase.mapper.js";
import { ILoginUserUsecaseOutputDto } from "../dtos/auth.dto.js";

@injectable()
export class LoginUserUsecase implements ILoginUserUsecase {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IBcrypt") private _bcrypt: IBcrypt,
    @inject("IJwtService") private _jwtService: IJwtService,
    @inject("IUniqueIdService") private _uniqueIdService: IUniqueIdService,
    @inject("ITokenRepository") private _tokenRepository: ITokenRepository,
    @inject("IAccountRepository")
    private _accountRepository: IAccountsRepository
  ) {}
  async execute(
    data: Pick<IAccountsEntity, "email" | "password">
  ): Promise<ILoginUserUsecaseOutputDto> {
    const account = await this._accountRepository.findByEmail(data.email);

    if (!account) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        "password"
      );
    }

    if (account.authProvider !== "local") {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        "password"
      );
    }

    const isMatch = await this._bcrypt.compare(
      data.password as string,
      account.password as string
    );

    if (!isMatch) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CREDENTIALS
      );
    }

    if (!account.isVerified) {
      throw new CustomError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_MESSAGES.ACCOUNT_NOT_VERIFIED
      );
    }

    const user = await this._userRepository.findByAccountId(
      account._id as string
    );
    const deviceId = this._uniqueIdService.generate();
    const accessToken = this._jwtService.signAccess({
      accountId: account._id,
      role: account.role,
      isProfileComplete: user?.isProfileComplete,
      deviceId,
    });

    const refreshToken = this._jwtService.signRefresh({
      accountId: account._id,
      role: account.role,
      isProfileComplete: user?.isProfileComplete,
      deviceId,
    });

    const payload = this._jwtService.verifyRefresh(refreshToken);

    const expire = new Date((payload?.exp ?? 0) * 1000);

    await this._tokenRepository.saveToken(
      account._id as string,
      deviceId,
      refreshToken,
      expire
    );

    const response = registerUserUsecaseMapper.toResponse({
      id: account._id as string,
      email: account.email,
      isProfileComplete: user?.isProfileComplete as boolean,
      profileUrl:account.profileUrl || ""

    });

    return {
      accessToken,
      refreshToken,
      deviceId,
      response,
    };
  }
}
