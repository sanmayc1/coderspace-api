import { inject, injectable } from "tsyringe";
import { IJwtPayload } from "../../entities/models/jwt-payload.enitity.js";
import { IAuthResponseDto } from "../dtos/auth.dto.js";
import { IAuthUserUsecase } from "../Interfaces/auth/auth-user.usecase.interface.js";
import { IAccountsRepository } from "../../entities/repositoryInterfaces/accounts-repository.interface.js";
import { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import { CustomError } from "../../entities/utils/errors/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { authUserUsecaseMapper } from "../mappers/mappers.js";

@injectable()
export class AuthUserUsecase implements IAuthUserUsecase {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IAccountRepository")
    private _accountRepository: IAccountsRepository
  ) {}
  async execute(user: IJwtPayload): Promise<IAuthResponseDto> {
    const { accountId } = user;

    const account = await this._accountRepository.findById(accountId);
   
    if (!account) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND
      );
    }

    const userProfile = await this._userRepository.findByAccountId(
      account._id as string
    );

    

    if (!userProfile) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND
      );
    }

    const response = authUserUsecaseMapper.toOutput(account, userProfile);

    return response;
  }
}
