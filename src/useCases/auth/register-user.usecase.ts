import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import { IRegisterUserUsecase } from "../../entities/useCaseInterfaces/auth/register-usecase.interface.js";
import { IBcrypt } from "../../entities/services/bcrypt.interface.js";
import { CustomError } from "../../entities/utils/errors/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IWalletRepository } from "../../entities/repositoryInterfaces/wallet-repository.interface.js";
import { UserRegisterRequestDto } from "./dtos/auth.dto.js";
import { UserMapper } from "./mappers/user.mapper.js";

@injectable()
export class RegisterUserUsecase implements IRegisterUserUsecase {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IBcrypt") private _bcrypt: IBcrypt,
    @inject("IWalletRepository") private _walletRepository: IWalletRepository
  ) {}

  async execute(data: UserRegisterRequestDto): Promise<string> {
    const user = UserMapper.toEntity(data)
    const existingUser = await this._userRepository.findByEmail(user.email);

    if (existingUser) {
      if (!existingUser.isVerified&& existingUser.username=== user.username) {
        return existingUser.email;
      }
      throw new CustomError(
        HTTP_STATUS.CONFLICT,
        ERROR_MESSAGES.EMAIL_EXIST,
        "email"
      );
    }

    const existUsername = await this._userRepository.findByUsername(user.username);

    if (existUsername) {
      throw new CustomError(
        HTTP_STATUS.CONFLICT,
        ERROR_MESSAGES.USERNAME_EXIST,
        "username"
      );
    }

    user.password = await this._bcrypt.hash(user.password as string);

    const createdUser = await this._userRepository.save(user);
    await this._walletRepository.create(createdUser._id, user.role);
    return createdUser.email;
  }
}
