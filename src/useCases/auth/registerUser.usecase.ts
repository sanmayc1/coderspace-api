import { inject, injectable } from "tsyringe";
import { IUserReopository } from "../../entities/repositoryInterfaces/user/user-repository.interface.js";
import { IRegisterUserUsecase } from "../../entities/useCaseInterfaces/auth/register-usecase.interface.js";
import { IUserEntity } from "../../entities/models/user.entity.js";
import { IBcrypt } from "./interfaces/bcrypt.interface.js";
import { CustomError } from "../../shared/utils/errors/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IWalletRepository } from "../../entities/repositoryInterfaces/wallet/wallet-repository.interface.js";
import { IJwtService } from "../../entities/services/jwtService.interface.js";

@injectable()
export class RegisterUserUsecase implements IRegisterUserUsecase {
  constructor(
    @inject("IUserRepository") private _userRepo: IUserReopository,
    @inject("IBcrypt") private _bcrypt: IBcrypt,
    @inject("IWalletRepository") private _walletRepo: IWalletRepository,
    @inject("IJwtService") private _jwtService:IJwtService
  ) {}

  async execute(user: IUserEntity): Promise<string> {
    const existingUser = await this._userRepo.findByEmail(user.email);

    if (existingUser) {
      throw new CustomError(
        HTTP_STATUS.CONFLICT,
        ERROR_MESSAGES.EMAIL_EXIST,
        "email"
      );
    }

    const existUsername = await this._userRepo.findByUsernmae(user.username);

    if (existUsername) {
      throw new CustomError(
        HTTP_STATUS.CONFLICT,
        ERROR_MESSAGES.USER_NAME_EXIST,
        "username"
      );
    }

    user.password = await this._bcrypt.hash(user.password);

    const createdUser = await this._userRepo.save(user);
    await this._walletRepo.create(createdUser._id, "user");
    const token = this._jwtService.signAccess({id:String(createdUser._id),email:createdUser.email})
    return token 
  }
}
