import { inject, injectable } from "tsyringe";
import { IUpdateUserPasswordInputDto } from "../../dtos/user.dto.js";
import { IUpdateUserPasswordUsecase } from "../../Interfaces/users/user-profile/update-user-password.interface.js";
import { IAccountsRepository } from "../../../domain/repositoryInterfaces/accounts-repository.interface.js";
import { IBcrypt } from "../../../domain/services/bcrypt.interface.js";
import { CustomError } from "../../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constant.js";

@injectable()
export class UpdateUserPasswordUsecase implements IUpdateUserPasswordUsecase {
  constructor(
    @inject("IAccountRepository")
    private _accountRepository: IAccountsRepository,
    @inject("IBcrypt")
    private _bcryptService: IBcrypt
  ) {}
  async execute(data: IUpdateUserPasswordInputDto): Promise<any> {
    const account = await this._accountRepository.findById(data.accountId);

    if (!account) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    if(account.authProvider !== "local"){
      throw new CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.INVALID_AUTH_PROVIDER);
    }

    const isPasswordValid = await this._bcryptService.compare(
      data.currentPassword,
      account.password as string
    );

    if (!isPasswordValid) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.VALIDATION_ERROR,"currentPassword");
    }

    if(data.newPassword === data.currentPassword){
      throw new CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.OLD_PASSWORD_AND_NEW_PASSWORD_SAME);
    }

    const hashedPassword = await this._bcryptService.hash(data.newPassword);

    await this._accountRepository.updateById(
      data.accountId,
      {password:hashedPassword}
    );
  }
}
