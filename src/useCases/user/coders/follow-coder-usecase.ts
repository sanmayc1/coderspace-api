import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { IFollowerRepository } from '../../../domain/repositoryInterfaces/follower-repository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { IFollowCodersUsecase } from '../../Interfaces/users/coders/follow-coders.usecase.interface';

@injectable()
export class FollowCoders implements IFollowCodersUsecase {
  constructor(
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('IFollowerRepository') private _followerRepository: IFollowerRepository
  ) {}

  async execute(accountId: string, followingId: string): Promise<void> {
   
    const requestedUser = await this._userRepository.findByAccountId(accountId);
    if (!requestedUser) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const followingUser = await this._userRepository.findById(followingId);
    if (!followingUser) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const isFollowing = await this._followerRepository.findFollowerByUserIdAndFolloweeId(requestedUser._id as string, followingUser._id as string);
    if (isFollowing) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.USER_ALREADY_FOLLOWING);
    }
     await this._followerRepository.create({
      followerId: requestedUser._id,
      followeeId: followingUser._id,
    });
  }
}
