import { IContestAttemptEntity } from '../entities/contest-attempt-entity';
import { IBaseRepository } from './base-repository.interface';

export interface IContestAttemptRepository extends IBaseRepository<IContestAttemptEntity> {
  updateContestByUserIdAndContestId(
    userId: string,
    contestId: string,
    update: Partial<IContestAttemptEntity>
  ): Promise<void>;

  getContestByUserIdAndContestId(
    userId: string,
    contestId: string
  ): Promise<IContestAttemptEntity | null>;

  getLeaderBoardByContestId(contestId: string): Promise<ILeaderboardUserDTO[]>;

}


export interface ILeaderboardUserDTO {
  userId: string;
  username: string;
  contestName: string;
  totalProblems: number;
  name: string;
  profileUrl: string;
  badge: string;
  score: number;
  solvedProblems: number;
  totalSubmissions: number;
  timeTaken: number;
}