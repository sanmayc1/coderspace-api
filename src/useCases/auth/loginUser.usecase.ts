import { inject, injectable } from "tsyringe";
import { ITokenEntity } from "../../entities/models/token.entity.js";
import { ILoginUserUsecase } from "../../entities/useCaseInterfaces/auth/loginUser.usecase.interface.js";
import { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import { CustomError } from "../../entities/utils/errors/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IBcrypt } from "../../entities/services/bcrypt.interface.js";
import { IJwtService } from "../../entities/services/jwtService.interface.js";

@injectable()
export class LoginUserUsecase implements ILoginUserUsecase {
  constructor(
   @inject("IUserRepository") private _userRepo:IUserRepository,
   @inject("IBcrypt") private _bcrypt: IBcrypt,
   @inject("IJwtService") private _jwtService:IJwtService

  ) {}
  async execute(email: string, password: string): Promise<ITokenEntity> {

    const user = await this._userRepo.findByEmail(email)

    if(!user){
        throw new CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.INVALID_CREDENTIALS)
    }
    const isMatch = await this._bcrypt.compare(password,user.password)

    if(!isMatch){
         throw new CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.INVALID_CREDENTIALS)
    }

   const accessToken = this._jwtService.signAccess({userId:user._id,role:user.role as string})
   const refreshToken = this._jwtService.signRefresh({userId:user._id,role:user.role as string})

   console.log(accessToken,refreshToken)
  
   return {accessToken,refreshToken}

  }
}
