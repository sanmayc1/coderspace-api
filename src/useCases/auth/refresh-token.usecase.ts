import { inject, injectable } from "tsyringe";
import { ITokenEntity } from "../../entities/models/token.entity.js";
import { IRefreshTokenUsecase } from "../Interfaces/auth/refresh-token.usecase.interface.js";
import { IJwtService } from "../../entities/services/jwt-service.interface.js";
import { CustomError } from "../../entities/utils/errors/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IJwtPayload } from "../../entities/models/jwt-payload.enitity.js";
import { ITokenRepository } from "../../entities/repositoryInterfaces/token-repository.interface.js";

@injectable()
export class RefreshTokenUsecase implements IRefreshTokenUsecase {
  constructor(
    @inject("IJwtService") private _jwtService: IJwtService,
    @inject("ITokenRepository")
    private _tokenRepo: ITokenRepository
  ) {}
  async execute(refreshToken: string, deviceId: string): Promise<ITokenEntity> {
    const payload = this._jwtService.verifyRefresh(refreshToken);

    if (payload === null) {
      throw new CustomError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.TOKEN_EXPIRE);
    }

    const isValid = await this._tokenRepo.tokenExists(refreshToken, deviceId);

    if (!isValid) {
      throw new CustomError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.TOKEN_EXPIRE);
    }

    const newPayload: IJwtPayload = {
      accountId: payload.accountId,
      isProfileComplete: payload.isProfileComplete,
      role: payload.role,
      deviceId,
    };
    const timeInSeconds = Math.floor(new Date().getTime() / 1000);
    const expireIn = Math.max((payload.exp ?? 0) - timeInSeconds, 1);
    const accessToken = this._jwtService.signAccess(newPayload);
    const newRefreshToken = this._jwtService.signRefresh(newPayload, expireIn);

    await this._tokenRepo.updateToken(newRefreshToken, deviceId);

    return { accessToken, refreshToken: newRefreshToken };
  }
}
