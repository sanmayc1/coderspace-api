import { inject, injectable } from 'tsyringe';
import { IUnfollowCodersUsecase } from '../../Interfaces/users/coders/unfollow-coders-usecase.interface';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { IFollowerRepository } from '../../../domain/repositoryInterfaces/follower-repository.interface';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { CustomError } from '../../../domain/utils/custom-error';

@injectable()
export class UnfollowCodersUsecase implements IUnfollowCodersUsecase {
  constructor(
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('IFollowerRepository') private _followerRepository: IFollowerRepository
  ) {}
  async execute(accountId: string, followingId: string): Promise<void> {
    const followingUser  = await this._userRepository.findById(followingId);
    if (!followingUser) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const requestedUser = await this._userRepository.findByAccountId(accountId);
    if (!requestedUser) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const isFollowing = await this._followerRepository.findFollowerByUserIdAndFolloweeId(requestedUser._id as string, followingUser._id as string);
    if (!isFollowing) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.USER_NOT_FOLLOWING);
    }
    await this._followerRepository.deleteById(isFollowing._id as string);
  }
}
