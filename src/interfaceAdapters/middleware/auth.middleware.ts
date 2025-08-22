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


@injectable()
export class AuthMiddleware implements IAuthMiddleware {
  constructor(@inject("IJwtService") private _jwtService: IJwtService) {}

  handle(role: TRole):Function {
    return (req: Request, res: Response, next: NextFunction) => {
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
