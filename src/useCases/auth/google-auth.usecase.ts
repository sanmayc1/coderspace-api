import { inject, injectable } from "tsyringe";
import {
  IAuthProviderUsecaseOutputDto,
  IGoogleAuthUsecaseInputDto,
} from "../dtos/auth.dto.js";
import { IGoogleAuthUsecase } from "../Interfaces/auth/google-auth.usecase.interface.js";
import { IAccountsRepository } from "../../domain/repositoryInterfaces/accounts-repository.interface.js";
import { googleAuthUsecaseMapper } from "../dtos/mappers/mappers.js";
import { ERROR_MESSAGES, HTTP_STATUS, TRole } from "../../shared/constant.js";
import { IUserRepository } from "../../domain/repositoryInterfaces/user-repository.interface.js";
import { IUserEntity } from "../../domain/entities/user.entity.js";
import { IJwtPayload } from "../../domain/entities/jwt-payload.enitity.js";
import { IUniqueIdService } from "../../domain/services/uuid.interface.js";
import { IJwtService } from "../../domain/services/jwt-service.interface.js";
import { IWalletRepository } from "../../domain/repositoryInterfaces/wallet-repository.interface.js";

@injectable()
export class GoogleAuthUsecase implements IGoogleAuthUsecase {
  constructor(
    @inject("IAccountRepository")
    private _accountRepository: IAccountsRepository,
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IUniqueIdService") private _uniqueIdService: IUniqueIdService,
    @inject("IJwtService") private _jwtService: IJwtService,
    @inject("IWalletRepository") private _walletRepository: IWalletRepository
  ) {}
  async execute(
    data: IGoogleAuthUsecaseInputDto
  ): Promise<IAuthProviderUsecaseOutputDto> {
    const accountEntity = googleAuthUsecaseMapper.toEntity(data);

    let account = await this._accountRepository.findByEmail(
      accountEntity.email
    );

    let user: IUserEntity | null;

    if (!account) {
      console.log("account-entity",accountEntity)
      account = await this._accountRepository.create(accountEntity);

      const baseUsername = `@${account.email.split("@")[0]}`;
      let username = "";
      let exists: IUserEntity | null | boolean = true;

      while (exists) {
        const ending = Math.floor(Math.random() * 1000 + 9000);
        username = baseUsername + ending;
        exists = await this._userRepository.findByUsername(username);
      }
  
      user = await this._userRepository.create({
        accountId: account._id,
        username,
      });

      await this._walletRepository.create({ accountId: account._id });

    } else if (account?.authProvider !== "google") {
      return {
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.INVALID_AUTH_PROVIDER,
      };
    } else {
      user = await this._userRepository.findByAccountId(account._id as string);
    }

    const deviceId = this._uniqueIdService.generate();

    const payload: IJwtPayload = {
      accountId: account._id as string,
      deviceId,
      isProfileComplete: user?.isProfileComplete as boolean,
      role: account.role as TRole,
    };
    const accessToken = this._jwtService.signAccess(payload);
    const refreshToken = this._jwtService.signRefresh(payload);

    return {
      statusCode: HTTP_STATUS.OK,
      accessToken,
      refreshToken,
      deviceId,
    };
  }
}
