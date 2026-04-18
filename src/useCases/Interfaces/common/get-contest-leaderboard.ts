import { IGetContestLeaderboardUsecaseOutputDto } from '../../dtos/user.dto';

export interface IGetContestLeaderboardUsecase {
  execute(
    id: string,
    page: number,
    search: string
  ): Promise<IGetContestLeaderboardUsecaseOutputDto>;
}
