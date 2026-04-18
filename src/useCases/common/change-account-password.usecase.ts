import { inject, injectable } from 'tsyringe';
import { IAccountsRepository } from '../../domain/repositoryInterfaces/accounts-repository.interface';
import { IBcrypt } from '../../domain/services/bcrypt.interface';
import { CustomError } from '../../domain/utils/custom-error';
import { IChangeAccountPasswordUsecase } from '../Interfaces/common/change-account-password.usecase.interface';
import { IChangePasswordUsecaseInputDto } from '../dtos/auth.dto';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../shared/constant';

@injectable()
export class ChangeAccountPasswordUsecase implements IChangeAccountPasswordUsecase {
  constructor(
    @inject('IAccountRepository')
    private _accountRepository: IAccountsRepository,
    @inject('IBcrypt')
    private _bcryptService: IBcrypt
  ) {}
  async execute(data: IChangePasswordUsecaseInputDto): Promise<void> {
    const account = await this._accountRepository.findById(data.accountId);

    if (!account) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    if (account.authProvider !== 'local') {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_AUTH_PROVIDER);
    }

    const isPasswordValid = await this._bcryptService.compare(
      data.currentPassword,
      account.password as string
    );

    if (!isPasswordValid) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CURRENT_PASSWORD,
        'currentPassword'
      );
    }

    if (data.newPassword === data.currentPassword) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.OLD_PASSWORD_AND_NEW_PASSWORD_SAME,
        'currentPassword'
      );
    }

    const hashedPassword = await this._bcryptService.hash(data.newPassword);

    await this._accountRepository.updateById(data.accountId, { password: hashedPassword });
  }
}
