import { injectable } from 'tsyringe';
import { IUserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositoryInterfaces/user-repository.interface';
import { IUserModel, UserModel } from '../../frameworks/database/models/user.model';
import { userMapperRepo } from '../../frameworks/database/dtoMappers/dto.mapper';
import { BaseRepository } from './base-repository';
import { USER_SORTING } from '../../shared/utils/mongo-utils';
import mongoose from 'mongoose';

@injectable()
export class UserRepository
  extends BaseRepository<IUserModel, IUserEntity>
  implements IUserRepository
{
  constructor() {
    super(UserModel, userMapperRepo.toEntity, userMapperRepo.toModel);
  }
  async getAllUsers(
    skip: number,
    limit: number,
    search: string,
    sort: string
  ): Promise<{ users: IUserEntity[] | []; count: number }> {
    const filter = {
      'accountId.isVerified': true,
      $or: [
        { 'accountId.name': new RegExp(search, 'i') },
        { 'accountId.email': new RegExp(search, 'i') },
        { username: new RegExp(search, 'i') },
      ],
    };

    const sortOption = USER_SORTING[sort as keyof typeof USER_SORTING];
    const doc = await UserModel.aggregate([
      {
        $lookup: {
          from: 'accounts',
          localField: 'accountId',
          foreignField: '_id',
          as: 'accountId',
        },
      },
      { $unwind: { path: '$accountId', preserveNullAndEmptyArrays: true } },
      { $match: filter },
      ...(sortOption ? [{ $sort: sortOption as { [key: string]: -1 | 1 } }] : []),
      { $skip: skip },
      { $limit: limit },
    ]);

    const count = await UserModel.find()
      .populate({
        path: 'accountId',
        match: { isVerified: true },
      })
      .countDocuments();

    return {
      users: doc.map((user) => userMapperRepo.toEntity(user)),
      count,
    };
  }
  async findByAccountId(id: string): Promise<IUserEntity | null> {
    const doc = await UserModel.findOne({ accountId: id });
    return doc ? userMapperRepo.toEntity(doc) : null;
  }

  async findByUsername(username: string): Promise<IUserEntity | null> {
    const user = await UserModel.findOne({ username });
    return user ? userMapperRepo.toEntity(user) : user;
  }

  async getAllUsersWithFollowing(
    userId: string,
    skip: number,
    limit: number,
    search: string,
    sort: string,
    badge: string
  ): Promise<{ users: (IUserEntity & { isFollowing: boolean })[]; count: number }> {
    const viewerId = new mongoose.Types.ObjectId(userId);

    const filter: any = { _id: { $ne: viewerId } };

    if (search) {
      filter.$or = [
        { 'accountId.name': new RegExp(search, 'i') },
        { 'accountId.email': new RegExp(search, 'i') },
        { username: new RegExp(search, 'i') },
      ];
    }

    if (badge && badge !== 'All') {
      filter.badge = badge;
    }

    const sortOption = USER_SORTING[sort as keyof typeof USER_SORTING] || { createdAt: -1 };

    const pipeline: any[] = [
      {
        $lookup: {
          from: 'accounts',
          localField: 'accountId',
          foreignField: '_id',
          as: 'accountId',
        },
      },
      { $unwind: { path: '$accountId', preserveNullAndEmptyArrays: true } },
      { $match: { 'accountId.isVerified': true } },
      { $match: filter },
    ];

    const countPipeline = [...pipeline, { $count: 'total' }];
    const countResult = await UserModel.aggregate(countPipeline);
    const count = countResult.length > 0 ? countResult[0].total : 0;

    const doc = await UserModel.aggregate([
      ...pipeline,
      {
        $lookup: {
          from: 'followers',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$followeeId', '$$userId'] }, { $eq: ['$followerId', viewerId] }],
                },
              },
            },
          ],
          as: 'followers',
        },
      },
      {
        $addFields: {
          isFollowing: { $gt: [{ $size: '$followers' }, 0] },
        },
      },
      { $sort: sortOption as { [key: string]: -1 | 1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    return {
      users: doc.map((user) => ({ ...userMapperRepo.toEntity(user), isFollowing: user.isFollowing })),
      count,
    };
  }
}
