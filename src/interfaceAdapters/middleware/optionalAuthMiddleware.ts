import { Request, Response, NextFunction } from 'express';
import { COOKIES_NAMES } from '../controllers/auth';
import { IAuthMiddleware } from './interfaces/auth-middleware.interface';



export const optionalAuthMiddleware =
  (authMiddleware: IAuthMiddleware) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies[COOKIES_NAMES.ACCESS_TOKEN]
    if (!accessToken) {
      req.user = undefined;
      return next();
    }

    return authMiddleware.handle(['user'])(req, res, next);
  };
