import { inject, injectable } from 'tsyringe';
import { IGetContestLeaderboardUsecase } from '../../Interfaces/users/contest/get-contest-leaderboard';
import { IContestAttemptRepository } from '../../../domain/repositoryInterfaces/contest-attempt-repository.interface';
import { IContestRepository } from '../../../domain/repositoryInterfaces/contest-repository.interface';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { CustomError } from '../../../domain/utils/custom-error';
import { IGetContestLeaderboardUsecaseOutputDto } from '../../dtos/user.dto';

@injectable()
export class GetContestLeaderboardUsecase implements IGetContestLeaderboardUsecase {
  constructor(
    @inject('IContestAttemptRepository')
    private _contestAttemptRepository: IContestAttemptRepository,
    @inject('IContestRepository') private _contestRepository: IContestRepository
  ) {}
  async execute(id: string): Promise<IGetContestLeaderboardUsecaseOutputDto[]> {
    const contest = await this._contestRepository.findById(id);
    if (!contest) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.CONTEST_NOT_FOUND);
    }
    const leaderboard = await this._contestAttemptRepository.getLeaderBoardByContestId(id);
    return leaderboard
  }
}
