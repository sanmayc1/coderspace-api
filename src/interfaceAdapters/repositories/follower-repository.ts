import { injectable } from 'tsyringe';
import { IFollowerRepository } from '../../domain/repositoryInterfaces/follower-repository.interface';
import { IFollowerEntity } from '../../domain/entities/follower-entity';
import { FollowerModel, IFollowerModel } from '../../frameworks/database/models/follower.model';
import { BaseRepository } from './base-repository';
import { followerRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import mongoose, { Types } from 'mongoose';

@injectable()
export class FollowerRepository
  extends BaseRepository<IFollowerModel, IFollowerEntity>
  implements IFollowerRepository
{
  constructor() {
    super(FollowerModel, followerRepositoryMapper.toEntity, followerRepositoryMapper.toModel);
  }
  async countFollowersAndFollowingCount(
    userId: string
  ): Promise<{ followersCount: number; followingCount: number }> {
    const viewerId = new mongoose.Types.ObjectId(userId);
    const counts = await FollowerModel.aggregate([
      {
        $facet: {
          pipeline1: [
            {
              $match: { followerId: viewerId },
            },
            {
              $count: 'followingCount',
            },
          ],
          pipeline2: [
            {
              $match: { followeeId: viewerId },
            },
            {
              $count: 'followersCount',
            },
          ],
        },
      },
    ]);

    return {
      followersCount: counts[0].pipeline2[0]?.followersCount || 0,
      followingCount: counts[0].pipeline1[0]?.followingCount || 0,
    };
  }
  findFollowerByUserId(userId: string): Promise<IFollowerEntity[]> {
    throw new Error('Method not implemented.');
  }
  findFollowingByUserId(userId: string): Promise<IFollowerEntity[]> {
    throw new Error('Method not implemented.');
  }
  async findFollowerByUserIdAndFolloweeId(
    followerId: string,
    followeeId: string
  ): Promise<IFollowerEntity | null> {
    const doc = await FollowerModel.findOne({
      followerId: followerId,
      followeeId: followeeId,
    });

    return doc ? followerRepositoryMapper.toEntity(doc) : null;
  }
}
