import { injectable } from 'tsyringe';
import {
  IContestAttemptRepository,
  ILeaderboardUserDTO,
} from '../../domain/repositoryInterfaces/contest-attempt-repository.interface';
import { IContestAttemptEntity } from '../../domain/entities/contest-attempt-entity';
import { BaseRepository } from './base-repository';
import {
  ContestAttemptModel,
  IContestAttemptModel,
} from '../../frameworks/database/models/contest-attempt.model';
import { contestAttemptRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { Types } from 'mongoose';

@injectable()
export class ContestAttemptRepository
  extends BaseRepository<IContestAttemptModel, IContestAttemptEntity>
  implements IContestAttemptRepository
{
  constructor() {
    super(
      ContestAttemptModel,
      contestAttemptRepositoryMapper.toEntity,
      contestAttemptRepositoryMapper.toModel
    );
  }
  async getLeaderBoardByContestId(contestId: string): Promise<ILeaderboardUserDTO[]> {
    const leaderboard = await ContestAttemptModel.aggregate([
      {
        $match: {
          contestId: new Types.ObjectId(contestId),
          score: { $gt: 1 },
        },
      },

      {
        $addFields: {
          timeTaken: {
            $subtract: ['$endDateAndTime', '$startDateAndTime'],
          },
        },
      },
      {
        $lookup: {
          from: 'contests',
          localField: 'contestId',
          foreignField: '_id',
          as: 'contest',
        },
      },
      { $unwind: '$contest' },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'accounts',
          localField: 'user.accountId',
          foreignField: '_id',
          as: 'account',
        },
      },
      { $unwind: '$account' },
      {
        $sort: {
          score: -1,
          solvedProblems: -1,
          totalSubmissions: 1,
          timeTaken: 1,
        },
      },
      {
        $project: {
          _id: 0,
          contestName: '$contest.title',
          userId: '$user._id',
          username: '$user.username',
          name: '$account.name',
          profileUrl: '$account.profileUrl',
          badge: '$user.badge',
          solvedProblems: 1,
          totalSubmissions: 1,
          timeTaken: 1,
          totalProblems: 1,
          score: 1,
        },
      },
    ]);

    return leaderboard.map((l) => ({
      userId: l.userId,
      username: l.username,
      name: l.name,
      profileUrl: l.profileUrl,
      badge: l.badge,
      solvedProblems: l.solvedProblems,
      totalSubmissions: l.totalSubmissions,
      timeTaken: l.timeTaken,
      score: l.score,
      contestName: l.contestName,
      totalProblems: l.totalProblems,

    }));
  }

  async updateContestByUserIdAndContestId(
    userId: string,
    contestId: string,
    update: Partial<IContestAttemptEntity>
  ): Promise<void> {
    await ContestAttemptModel.findOneAndUpdate({ userId, contestId }, update);
  }
  async getContestByUserIdAndContestId(
    userId: string,
    contestId: string
  ): Promise<IContestAttemptEntity | null> {
    const contestAttempt = await ContestAttemptModel.findOne({ userId, contestId });
    return contestAttempt ? contestAttemptRepositoryMapper.toEntity(contestAttempt) : null;
  }
}
