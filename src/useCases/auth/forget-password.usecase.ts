import { inject, injectable } from "tsyringe";
import { IPasswordRestRepository } from "../../domain/repositoryInterfaces/password-reset.interface.js";
import { CustomError } from "../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IForgetPasswordUsecase } from "../Interfaces/auth/forget-password.usecase.interface.js";
import { IBcrypt } from "../../domain/services/bcrypt.interface.js";
import { IAccountsRepository } from "../../domain/repositoryInterfaces/accounts-repository.interface.js";

@injectable()
export class ForgetPasswordUsecase implements IForgetPasswordUsecase {
  constructor(
    @inject("IPasswordRestRepository")
    private _passwordRestRepository: IPasswordRestRepository,
    @inject("IAccountRepository")
    private _accountRepository: IAccountsRepository,
    @inject("IBcrypt") private _bcrypt: IBcrypt,
  ) {}
  async execute(token: string, newPassword: string): Promise<void> {
    const accountId = await this._passwordRestRepository.find(`reset:${token}`);
    if (!accountId) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.REST_LINK_EXPIRE
      );
    }

    const account = await this._accountRepository.findById(accountId);

    if (!account) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.REST_LINK_EXPIRE
      );
    }

    const hasedPassword = await this._bcrypt.hash(newPassword);

    await this._accountRepository.updateById(accountId, {
      password: hasedPassword,
    });
    await this._passwordRestRepository.del(`reset:${token}`);
  }
}
