import { inject, injectable } from 'tsyringe';
import { IAuthMiddleware } from './interfaces/auth-middleware.interface';
import { IJwtService } from '../../domain/services/jwt-service.interface';
import { COOKIES_NAMES, ERROR_MESSAGES, HTTP_STATUS, TRole } from '../../shared/constant';
import { NextFunction, Request, Response } from 'express';
import { IBlackListTokenRepository } from '../../domain/repositoryInterfaces/blacklist-token.interface';
import { IAccountsRepository } from '../../domain/repositoryInterfaces/accounts-repository.interface';
import { commonResponse, CustomError } from '../controllers/auth/index';

@injectable()
export class AuthMiddleware implements IAuthMiddleware {
  constructor(
    @inject('IJwtService') private _jwtService: IJwtService,
    @inject('IBlackListTokenRepository')
    private _blacklistRepository: IBlackListTokenRepository,
    @inject('IAccountRepository')
    private _accountsRepository: IAccountsRepository
  ) {}

  handle(role: TRole[]): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      const accessToken = req.cookies[COOKIES_NAMES.ACCESS_TOKEN];
      const refreshToken = req.cookies[COOKIES_NAMES.REFRESH_TOKEN];
      if (!accessToken) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ success: false, message: ERROR_MESSAGES.TOKEN_EXPIRE });
        return;
      }

      const payload = this._jwtService.verifyAccess(accessToken);
      const refreshPayload = this._jwtService.verifyRefresh(refreshToken);

      if (payload === null && refreshPayload === null) {
        res.status(HTTP_STATUS.FORBIDDEN).json(commonResponse(false, ERROR_MESSAGES.FORCE_LOGOUT));
        return;
      }

      if (payload === null) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ success: false, message: ERROR_MESSAGES.TOKEN_EXPIRE });
        return;
      }

      // Checking access token is blacklisted

      const isBlacklisted = await this._blacklistRepository.find(`blacklist:${accessToken}`);

      if (isBlacklisted) {
        res
          .status(HTTP_STATUS.FORBIDDEN)
          .json({ success: false, message: ERROR_MESSAGES.TOKEN_BLACKLIST });
        return;
      }
      const account = await this._accountsRepository.findById(payload.accountId);

      if (account?.isBlocked) {
        res
          .status(HTTP_STATUS.FORBIDDEN)
          .json(commonResponse(false, ERROR_MESSAGES.ACCOUNT_BLOCKED_FORCE_LOGOUT));
        return;
      }

      if (!role.includes(payload.role as TRole)) {
        res
          .status(HTTP_STATUS.FORBIDDEN)
          .json({ success: false, message: ERROR_MESSAGES.ACCESS_DENIED });
        return;
      }

      req.user = payload;

      next();
    };
  }
}
