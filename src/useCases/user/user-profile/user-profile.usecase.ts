import { inject, injectable } from 'tsyringe';
import { IGetUserUsecaseOutputDto } from '../../dtos/user.dto';
import { IGetUserUsecase } from '../../Interfaces/users/user-profile/user-profile.usecase.interface';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { IAccountsRepository } from '../../../domain/repositoryInterfaces/accounts-repository.interface';
import { getUserUsecaseMapper } from '../../dtos/mappers/mappers';

@injectable()
export class GetUserUsecase implements IGetUserUsecase {
  constructor(
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('IAccountRepository')
    private _accountRepository: IAccountsRepository
  ) {}
  async execute(accountId: string): Promise<IGetUserUsecaseOutputDto> {
    const account = await this._accountRepository.findById(accountId);

    if (!account) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    const user = await this._userRepository.findByAccountId(accountId);

    if (!user) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const response = getUserUsecaseMapper.toOutput(user, account);
    return response;
  }
}
