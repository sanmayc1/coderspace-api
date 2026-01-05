import { inject, injectable } from 'tsyringe';
import { IUpdateUserStatusUsecase } from '../../Interfaces/admin/user-management/update-user-status.usecase.interface';
import { IAccountsRepository } from '../../../domain/repositoryInterfaces/accounts-repository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';

@injectable()
export class UpdateUserStatusUsecase implements IUpdateUserStatusUsecase {
  constructor(
    @inject('IAccountRepository')
    private _accountsRepository: IAccountsRepository
  ) {}

  async execute(accountId: string): Promise<void> {
    const account = await this._accountsRepository.findById(accountId);

    if (!account) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    await this._accountsRepository.updateById(accountId, {
      isBlocked: !account.isBlocked,
    });
  }
}
