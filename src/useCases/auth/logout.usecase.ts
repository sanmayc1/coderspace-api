import { inject, injectable } from "tsyringe";
import { ILogoutUsecase } from "../Interfaces/auth/logout.usecase.interface.js";
import { IBlackListTokenRepository } from "../../domain/repositoryInterfaces/blacklist-token.interface.js";
import { IJwtService } from "../../domain/services/jwt-service.interface.js";

@injectable()
export class LogoutUsecase implements ILogoutUsecase {
  constructor(
    @inject("IBlackListTokenRepository")
    private _blacklistRepo: IBlackListTokenRepository,
    @inject("IJwtService") private _jwtService: IJwtService
  ) {}
  async executes(
    refreshToken: string,
    accessToken: string,
  ): Promise<void> {
    const accessPayload = this._jwtService.verifyAccess(accessToken);
    const refreshPayload = this._jwtService.verifyAccess(refreshToken);
    const now = Math.floor(Date.now() / 1000);

    const accessExpire = accessPayload?.exp
      ? Math.max(accessPayload.exp - now, 0)
      : 0;

    const refreshExpire = refreshPayload?.exp
      ? Math.max(refreshPayload.exp - now, 0)
      : 0;
    if (accessExpire > 0) {
      await this._blacklistRepo.save(`blacklist:${accessToken}`, accessExpire);
    }

    if (refreshExpire > 0) {
      await this._blacklistRepo.save(
        `blacklist:${refreshToken}`,
        refreshExpire
      );
    }
  }
}
