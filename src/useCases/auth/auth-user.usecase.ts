import { inject, injectable } from 'tsyringe';
import { IJwtPayload } from '../../domain/entities/jwt-payload.enitity';
import { IAuthResponseDto } from '../dtos/auth.dto';
import { IAuthUserUsecase } from '../Interfaces/auth/auth-user.usecase.interface';
import { IAccountsRepository } from '../../domain/repositoryInterfaces/accounts-repository.interface';
import { IUserRepository } from '../../domain/repositoryInterfaces/user-repository.interface';
import { CustomError } from '../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../shared/constant';
import { authUserUsecaseMapper } from '../dtos/mappers/mappers';

@injectable()
export class AuthUserUsecase implements IAuthUserUsecase {
  constructor(
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('IAccountRepository')
    private _accountRepository: IAccountsRepository
  ) {}
  async execute(user: IJwtPayload): Promise<IAuthResponseDto> {
    const { accountId } = user;

    const account = await this._accountRepository.findById(accountId);

    if (!account) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    if (user.role === 'user') {
      const userProfile = await this._userRepository.findByAccountId(account._id as string);

      if (!userProfile) {
        throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
      }
      const response = authUserUsecaseMapper.toOutput(account, userProfile);

      return response;
    }

    const response = authUserUsecaseMapper.toOutput(account);

    return response;
  }
}
