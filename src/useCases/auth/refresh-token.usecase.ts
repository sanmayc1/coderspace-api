import { inject, injectable } from 'tsyringe';
import { IRefreshTokenUsecase } from '../Interfaces/auth/refresh-token.usecase.interface';
import { IJwtService } from '../../domain/services/jwt-service.interface';
import { CustomError } from '../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../shared/constant';
import { IJwtPayload } from '../../domain/entities/jwt-payload.enitity';
import { IBlackListTokenRepository } from '../../domain/repositoryInterfaces/blacklist-token.interface';

@injectable()
export class RefreshTokenUsecase implements IRefreshTokenUsecase {
  constructor(
    @inject('IJwtService') private _jwtService: IJwtService,
    @inject('IBlackListTokenRepository')
    private _blacklistRepository: IBlackListTokenRepository
  ) {}
  async execute(refreshToken: string, deviceId: string): Promise<string> {
    const payload = this._jwtService.verifyRefresh(refreshToken);

    if (payload === null) {
      throw new CustomError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.TOKEN_EXPIRE);
    }

    const valid = await this._blacklistRepository.find(`blacklist:${refreshToken}`);

    if (valid) {
      throw new CustomError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.TOKEN_BLACKLIST);
    }

    const newPayload: IJwtPayload = {
      accountId: payload.accountId,
      isProfileComplete: payload.isProfileComplete,
      role: payload.role,
      deviceId,
    };

    const accessToken = this._jwtService.signAccess(newPayload);

    return accessToken;
  }
}
