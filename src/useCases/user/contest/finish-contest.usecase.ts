import { inject, injectable } from 'tsyringe';
import { IFinishContestUsecase } from '../../Interfaces/users/contest/finish-contest.usecase.interface';
import { IContestRepository } from '../../../domain/repositoryInterfaces/contest-repository.interface';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { IContestAttemptRepository } from '../../../domain/repositoryInterfaces/contest-attempt-repository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';

@injectable()
export class FinishContestUsecase implements IFinishContestUsecase {
  constructor(
    @inject('IContestRepository') private _contestRepository: IContestRepository,
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('IContestAttemptRepository')
    private _contestAttemptRepository: IContestAttemptRepository
  ) {}
  async execute(contestId: string, accountId: string): Promise<void> {
    const contest = await this._contestRepository.findById(contestId);
    if (!contest) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.CONTEST_NOT_FOUND);
    }

    const user = await this._userRepository.findByAccountId(accountId);
    if (!user) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const contestAttempt = await this._contestAttemptRepository.getContestByUserIdAndContestId(
      user._id as string,
      contest._id as string
    );
    if (!contestAttempt) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.CONTEST_ATTEMPT_NOT_FOUND);
    }

    const GRACE_PERIOD_MS = 30 * 1000;

    const contestEndWithGrace = contest.endDateAndTime.getTime() + GRACE_PERIOD_MS;

    if (Date.now() > contestEndWithGrace) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.CONTEST_ENDED);
    }

    await this._contestAttemptRepository.updateById(contestAttempt._id as string, {
      endDateAndTime: new Date(),
    });
  }
}
