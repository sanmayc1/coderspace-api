

import { NextFunction, Request, Response } from 'express';
import { TPremiumContents } from '../../../shared/constant';

export interface IPremiumGuardMiddleware {
  protect(content: TPremiumContents): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}