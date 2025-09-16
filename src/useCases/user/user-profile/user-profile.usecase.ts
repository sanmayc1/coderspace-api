import { inject, injectable } from "tsyringe";
import { IGetUserUsecaseOutputDto } from "../../dtos/user.dto.js";
import { IGetUserUsecase } from "../../Interfaces/users/user-profile/user-profile.usecase.interface.js";
import { IUserRepository } from "../../../entities/repositoryInterfaces/user-repository.interface.js";
import { CustomError } from "../../../entities/utils/errors/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constant.js";
import { IAccountsRepository } from "../../../entities/repositoryInterfaces/accounts-repository.interface.js";
import { getUserUsecaseMapper } from "../../mappers/mappers.js";

@injectable()
export class GetUserUsecase implements IGetUserUsecase {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IAccountRepository")
    private _accountRepository: IAccountsRepository
  ) {}
  async execute(accountId: string): Promise<IGetUserUsecaseOutputDto> {
    const account = await this._accountRepository.findById(accountId);

    if (!account) {
      throw new CustomError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND
      );
    }

    const user = await this._userRepository.findByAccountId(accountId);

    if (!user) {
      throw new CustomError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.USER_NOT_FOUND
      );
    }

    const response = getUserUsecaseMapper.toOutput(user, account);
    console.log(response);
    return response;
  }
}
