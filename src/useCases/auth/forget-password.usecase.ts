import { inject, injectable } from "tsyringe";
import { ISendRestPasswordLink } from "../../entities/useCaseInterfaces/auth/send-reset-link.js";
import { IPasswordRestRepository } from "../../entities/repositoryInterfaces/password-reset.interface.js";
import { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import { CustomError } from "../../entities/utils/errors/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IForgetPasswordUsecase } from "../../entities/useCaseInterfaces/auth/forget-password.usecase.interface.js";
import { IBcrypt } from "../../entities/services/bcrypt.interface.js";
import { ITokenRepository } from "../../entities/repositoryInterfaces/token-repository.interface.js";

@injectable()
export class ForgetPasswordUsecase implements IForgetPasswordUsecase {
  constructor(
    @inject("IPasswordRestRepository")
    private _passwordRestRepository: IPasswordRestRepository,
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IBcrypt") private _bcrypt: IBcrypt,
    @inject("ITokenRepository") private _tokenRepository: ITokenRepository
  ) {}
  async execute(token: string, newPassword: string): Promise<void> {
    const userId = await this._passwordRestRepository.find(`reset:${token}`);
    if (!userId) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.REST_LINK_EXPIRE
      );
    }

    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.REST_LINK_EXPIRE
      );
    }

    const hasedPassword = await this._bcrypt.hash(newPassword);

    await this._userRepository.updateById(user._id, { password: hasedPassword });
    await this._passwordRestRepository.del(`reset:${token}`);
    await this._tokenRepository.deleteAllTokenByUserId(user._id);
  }
}
