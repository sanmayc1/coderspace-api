import { inject, injectable } from "tsyringe";
import { IPasswordRestRepository } from "../../entities/repositoryInterfaces/password-reset.interface.js";
import { CustomError } from "../../entities/utils/errors/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IForgetPasswordUsecase } from "../Interfaces/auth/forget-password.usecase.interface.js";
import { IBcrypt } from "../../entities/services/bcrypt.interface.js";
import { ITokenRepository } from "../../entities/repositoryInterfaces/token-repository.interface.js";
import { IAccountsRepository } from "../../entities/repositoryInterfaces/accounts-repository.interface.js";

@injectable()
export class ForgetPasswordUsecase implements IForgetPasswordUsecase {
  constructor(
    @inject("IPasswordRestRepository")
    private _passwordRestRepository: IPasswordRestRepository,
    @inject("IAccountRepository")
    private _accountRepository: IAccountsRepository,
    @inject("IBcrypt") private _bcrypt: IBcrypt,
    @inject("ITokenRepository") private _tokenRepository: ITokenRepository
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
    await this._tokenRepository.deleteAllTokenByUserId(accountId);
  }
}
