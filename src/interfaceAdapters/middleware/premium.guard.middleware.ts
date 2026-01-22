import { NextFunction, Request, Response } from 'express';
import { IPremiumGuardMiddleware } from './interfaces/premium.guard.middleware.interface';
import { inject, injectable } from 'tsyringe';
import { ERROR_MESSAGES, HTTP_STATUS, TPremiumContents } from '../../shared/constant';
import { IProblemRepository } from '../../domain/repositoryInterfaces/problem-repository.interface';
import { IUserRepository } from '../../domain/repositoryInterfaces/user-repository.interface';
import { CustomError } from '../controllers/auth';

@injectable()
export class PremiumGuardMiddleware implements IPremiumGuardMiddleware {
  constructor(
    @inject('IUserRepository')
    private _userRepository: IUserRepository,
    @inject('IProblemRepository') private _problemRepository: IProblemRepository
  ) {}

  protect(
    content: TPremiumContents
  ): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      if (content === 'problem') {
        const problem = await this._problemRepository.findById(id);
        if (!problem) {
          throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.PROBLEM_NOT_FOUND);
        }
        if (!problem.isPremium) {
          
          return next();
        }
        
        const user = await this._userRepository.findByAccountId(req.user?.accountId as string);
        if (!user) {
          throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.USER_NOT_FOUND);
        }
        
        if (!user.subscription) {
          throw new CustomError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.PREMIUM_REQUIRED);
        }

        if (user.subscription.endDate < new Date()) {
          await this._userRepository.updateById(user._id as string, {
            subscription: null,
          });
          throw new CustomError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.PREMIUM_REQUIRED);
        }

      return next();
      }

      if (content === 'interview') {
        return next();
      }
    };
  }
}
