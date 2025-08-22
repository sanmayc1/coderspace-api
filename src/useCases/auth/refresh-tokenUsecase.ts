import { inject, injectable } from "tsyringe";
import { ITokenEntity } from "../../entities/models/token.entity.js";
import { IRefreshTokenUsecase } from "../../entities/useCaseInterfaces/auth/refresh-token.usecase.interface.js";
import { IJwtService } from "../../entities/services/jwt-service.interface.js";
import { CustomError } from "../../entities/utils/errors/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IJwtPayload } from "../../entities/models/jwt-payload.enitity.js";
import { IBlackListTokenRepository } from "../../entities/repositoryInterfaces/blacklist-token.interface.js";

@injectable()
export class RefreshTokenUsecase implements IRefreshTokenUsecase {
  constructor(
    @inject("IJwtService") private _jwtService: IJwtService,
    @inject("IBlackListTokenRepository")
    private _blacklistRepo: IBlackListTokenRepository
  ) {}
  async execute(
    refreshToken: string
  ): Promise<Omit<ITokenEntity, "refreshToken">> {
    const payload = this._jwtService.verifyRefresh(refreshToken);

    if (payload === null) {
      throw new CustomError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_MESSAGES.TOKEN_EXPIRE
      );
    }

    const isBlackList = await this._blacklistRepo.find(refreshToken);

    

    if (isBlackList) {
      throw new CustomError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_MESSAGES.TOKEN_BLACKLIST
      );
    }

    const newPayload: IJwtPayload = {
      userId: payload.userId,
      isProfileComplete: payload.isProfileComplete,
      role: payload.role,
    };
    const accessToken = this._jwtService.signAccess(newPayload);
    return { accessToken };
  }
}
