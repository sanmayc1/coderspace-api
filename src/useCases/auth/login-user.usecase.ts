import { inject, injectable } from 'tsyringe';
import { ILoginUserUsecase } from '../Interfaces/auth/login-user.usecase.interface';
import { IUserRepository } from '../../domain/repositoryInterfaces/user-repository.interface';
import { CustomError } from '../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../shared/constant';
import { IBcrypt } from '../../domain/services/bcrypt.interface';
import { IJwtService } from '../../domain/services/jwt-service.interface';
import { IUniqueIdService } from '../../domain/services/uuid.interface';
import { IAccountsRepository } from '../../domain/repositoryInterfaces/accounts-repository.interface';
import { IAccountsEntity } from '../../domain/entities/accounts-entity';
import { LoginUsecaseMapper } from '../dtos/mappers/register.usecase.mapper';
import { ILoginUsecaseOutputDto } from '../dtos/auth.dto';
import { IUserEntity } from '../../domain/entities/user.entity';

@injectable()
export class LoginUserUsecase implements ILoginUserUsecase {
  constructor(
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('IBcrypt') private _bcrypt: IBcrypt,
    @inject('IJwtService') private _jwtService: IJwtService,
    @inject('IUniqueIdService') private _uniqueIdService: IUniqueIdService,
    @inject('IAccountRepository')
    private _accountRepository: IAccountsRepository
  ) {}
  async execute(
    data: Pick<IAccountsEntity, 'email' | 'password'>
  ): Promise<ILoginUsecaseOutputDto> {
    const account = await this._accountRepository.findByEmail(data.email);

    if (!account) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        'password'
      );
    }

    if (account.authProvider !== 'local') {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        'password'
      );
    }

    const isMatch = await this._bcrypt.compare(data.password as string, account.password as string);

    if (!isMatch) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        'password'
      );
    }

    if (!account.isVerified) {
      throw new CustomError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.ACCOUNT_NOT_VERIFIED);
    }

    if (account.role !== 'user') {
      throw new CustomError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.AUTH_ACCESS_DENIED, 'password');
    }

    if (account.isBlocked) {
      throw new CustomError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.ACCOUNT_BLOCKED, 'password');
    }

    const user = await this._userRepository.findByAccountId(account._id as string);

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

    const response = LoginUsecaseMapper.toResponse(account, user as IUserEntity);

    return {
      accessToken,
      refreshToken,
      deviceId,
      response,
    };
  }
}
