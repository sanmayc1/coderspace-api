import { inject, injectable } from 'tsyringe';
import { IGithHubAuthUsecase } from '../Interfaces/auth/github-auth.usecase.interface';
import { ERROR_MESSAGES, HTTP_STATUS, TRole } from '../../shared/constant';
import { IGitHubAuthService } from '../../domain/services/github-auth-service.interface';
import { IUserRepository } from '../../domain/repositoryInterfaces/user-repository.interface';
import { IWalletRepository } from '../../domain/repositoryInterfaces/wallet-repository.interface';
import { IJwtService } from '../../domain/services/jwt-service.interface';
import { IUniqueIdService } from '../../domain/services/uuid.interface';
import { IUserEntity } from '../../domain/entities/user.entity';
import { IAccountsRepository } from '../../domain/repositoryInterfaces/accounts-repository.interface';
import { IAccountsEntity } from '../../domain/entities/accounts-entity';
import { IAuthProviderUsecaseOutputDto } from '../dtos/auth.dto';
import { IJwtPayload } from '../../domain/entities/jwt-payload.enitity';

@injectable()
export class GitHubAuthUsecase implements IGithHubAuthUsecase {
  constructor(
    @inject('IGitHubAuthService')
    private _githubAuthService: IGitHubAuthService,
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('IWalletRepository') private _walletRepository: IWalletRepository,
    @inject('IJwtService') private _jwtService: IJwtService,
    @inject('IUniqueIdService') private _uniqueIdService: IUniqueIdService,
    @inject('IAccountRepository')
    private _accountRepository: IAccountsRepository
  ) {}
  async execute(
    sessionState: string,
    state: string,
    code: string
  ): Promise<IAuthProviderUsecaseOutputDto> {
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

    const userProfile = await this._githubAuthService.getUserProfile(token);
    let account = await this._accountRepository.findByEmail(userProfile.email);
    let user: IUserEntity | null;

    if (!account) {
      const baseUsername = `@${userProfile.email.split('@')[0]}`;
      let username: string = '';
      let exists: IUserEntity | boolean | null = true;
      while (exists) {
        const ending = Math.floor(Math.random() * 1000 + 9000);
        username = baseUsername + ending;
        exists = await this._userRepository.findByUsername(username);
      }

      const newAccount: IAccountsEntity = {
        email: userProfile.email,
        name: userProfile.name,
        authProvider: 'github',
        isVerified: true,
        ...(userProfile.avatar_url && { profileUrl: userProfile.avatar_url }),
      };

      account = await this._accountRepository.create(newAccount);
      user = await this._userRepository.create({
        accountId: account._id,
        username,
        githubUrl: userProfile.html_url,
      });
      await this._walletRepository.create({ accountId: account._id });
    } else if (account.authProvider !== 'github') {
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
