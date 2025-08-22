import { inject, injectable } from "tsyringe";
import {
  ILoginUserUsecase,
  ILoginUserUsecaseOutput,
} from "../../entities/useCaseInterfaces/auth/login-user.usecase.interface.js";
import { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import { CustomError } from "../../entities/utils/errors/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IBcrypt } from "../../entities/services/bcrypt.interface.js";
import { IJwtService } from "../../entities/services/jwt-service.interface.js";
import { IUniqueIdService } from "../../entities/services/uuid.interface.js";

@injectable()
export class LoginUserUsecase implements ILoginUserUsecase {
  constructor(
    @inject("IUserRepository") private _userRepo: IUserRepository,
    @inject("IBcrypt") private _bcrypt: IBcrypt,
    @inject("IJwtService") private _jwtService: IJwtService,
    @inject("IUniqueIdService") private _uniqueIdService:IUniqueIdService
  ) {}
  async execute(
    email: string,
    password: string
  ): Promise<ILoginUserUsecaseOutput> {
    const user = await this._userRepo.findByEmail(email);

    if (!user) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CREDENTIALS
      );
    }

    if(user.authProvider !== 'local'){
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CREDENTIALS
      );
    }

    const isMatch = await this._bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CREDENTIALS
      );
    }

    const accessToken = this._jwtService.signAccess({
      userId: user._id,
      role: user.role as string,
      isProfileComplete:user.isProfileComplete
    });
    const refreshToken = this._jwtService.signRefresh({
      userId: user._id,
      role: user.role as string,
      isProfileComplete:user.isProfileComplete
    });

    const clientId = this._uniqueIdService.generate()

    return {
      accessToken,
      refreshToken,
      _id: user._id,
      email: user.email,
      isProfileComplete: user.isProfileComplete,
      clientId
    };
  }
}
