import { inject, injectable } from "tsyringe";
import { IAuthMiddleware } from "../../entities/middleware/auth-middleware.interface.js";
import { IJwtService } from "../../entities/services/jwt-service.interface.js";
import {
  COOKIES_NAMES,
  ERROR_MESSAGES,
  HTTP_STATUS,
  TRole,
} from "../../shared/constant.js";
import { NextFunction, Request, Response } from "express";
import { IBlackListTokenRepository } from "../../entities/repositoryInterfaces/blacklist-token.interface.js";

@injectable()
export class AuthMiddleware implements IAuthMiddleware {
  constructor(
    @inject("IJwtService") private _jwtService: IJwtService,
    @inject("IBlackListTokenRepository")
    private _blacklistRepo: IBlackListTokenRepository
  ) {}

  handle(role: TRole): Function {
    return async (req: Request, res: Response, next: NextFunction) => {
      const accessToken = req.cookies[COOKIES_NAMES.ACCESS_TOKEN];
      if (!accessToken) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ success: false, message: ERROR_MESSAGES.TOKEN_MISSING });
        return;
      }

      const payload = this._jwtService.verifyAccess(accessToken);

      if (payload === null) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ success: false, message: ERROR_MESSAGES.TOKEN_EXPIRE });
        return;
      }

      // Checking access token is blacklisted

      const isBlacklisted = await this._blacklistRepo.find(`blacklist:${accessToken}`);

      if (isBlacklisted) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ success: false, message: ERROR_MESSAGES.TOKEN_BLACKLIST });
        return;
      }

      if (payload.role !== role) {
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
