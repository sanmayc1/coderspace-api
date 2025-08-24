import { inject, injectable } from "tsyringe";
import { ILogoutUsecase } from "../../entities/useCaseInterfaces/auth/logout.usecase.interface.js";
import { ITokenRepository } from "../../entities/repositoryInterfaces/token-repository.interface.js";
import { IBlackListTokenRepository } from "../../entities/repositoryInterfaces/blacklist-token.interface.js";
import { IJwtService } from "../../entities/services/jwt-service.interface.js";

@injectable()
export class LogoutUsecase implements ILogoutUsecase {
  constructor(
    @inject("ITokenRepository") private _tokenRepo: ITokenRepository,
    @inject("IBlackListTokenRepository")
    private _blacklistRepo: IBlackListTokenRepository,
    @inject("IJwtService") private _jwtService: IJwtService
  ) {}
  async executes(
    refreshToken: string,
    accessToken: string,
    deviceId: string
  ): Promise<void> {
    let payload = this._jwtService.verifyAccess(accessToken);

    const expire = Math.max(
      (payload ? payload?.exp ?? 0 : 0) -
        Math.floor(new Date().getTime() / 1000)
    );

    await this._blacklistRepo.save(`blacklist:${accessToken}`, expire);
    await this._tokenRepo.deleteByTokenAndDeviceId(refreshToken, deviceId);
    
  }
}
