import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../domain/repositoryInterfaces/user-repository.interface.js";
import { IRegisterUserUsecase } from "../Interfaces/auth/register-user-usecase.interface.js";
import { IBcrypt } from "../../domain/services/bcrypt.interface.js";
import { CustomError } from "../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IWalletRepository } from "../../domain/repositoryInterfaces/wallet-repository.interface.js";
import { RegisterUserRequestDto } from "../dtos/auth.dto.js";
import { accountDtoMapper } from "../dtos/mappers/account.mapper.js";
import { IAccountsRepository } from "../../domain/repositoryInterfaces/accounts-repository.interface.js";

@injectable()
export class RegisterUserUsecase implements IRegisterUserUsecase {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IBcrypt") private _bcrypt: IBcrypt,
    @inject("IWalletRepository") private _walletRepository: IWalletRepository,
    @inject("IAccountRepository")
    private _accountRepository: IAccountsRepository
  ) {}

  async execute(data: RegisterUserRequestDto): Promise<string> {
    const account = accountDtoMapper.toEntity(data);

    const existingAccount = await this._accountRepository.findByEmail(
      account.email
    );

    if (existingAccount) {
      throw new CustomError(
        HTTP_STATUS.CONFLICT,
        ERROR_MESSAGES.EMAIL_EXIST,
        "email"
      );
    }

    const existingUsername = await this._userRepository.findByUsername(
      data.username
    );

    if ( existingUsername) {
      throw new CustomError(
        HTTP_STATUS.CONFLICT,
        ERROR_MESSAGES.USERNAME_EXIST,
        "username"
      );
    }

    const hashedPassword = await this._bcrypt.hash(account.password as string);
    account.password = hashedPassword;

    const newAccount = await this._accountRepository.create(account);
    await this._userRepository.create({
      username: data.username,
      accountId: newAccount._id,
    });

    await this._walletRepository.create({accountId:newAccount._id})

    return account.email;

  }
}
