import { inject, injectable } from 'tsyringe';
import { IGetCoderUsecase } from '../../Interfaces/users/coders/get-coder.usecase.interface';
import { IGetCoderUsecaseOutputDto } from '../../dtos/user.dto';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { IFollowerRepository } from '../../../domain/repositoryInterfaces/follower-repository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { getCoderUsecaseMapper } from '../../dtos/mappers/mappers';
import { IAccountsRepository } from '../../../domain/repositoryInterfaces/accounts-repository.interface';

@injectable()
export class GetCoderUsecase implements IGetCoderUsecase {
  constructor(
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('IAccountRepository') private _accountRepository: IAccountsRepository,
    @inject('IFollowerRepository') private _followerRepository: IFollowerRepository
  ) {}

  async execute(accountId: string,coderId: string): Promise<IGetCoderUsecaseOutputDto> {

    const coder = await this._userRepository.findById(coderId);


    if(!coder){
      throw new CustomError(HTTP_STATUS.NOT_FOUND,ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const account = await this._accountRepository.findById(coder.accountId as string);
    const requestedUser = await this._userRepository.findByAccountId(accountId);

    if(!account){
      throw new CustomError(HTTP_STATUS.NOT_FOUND,ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    const followerCount = await this._followerRepository.countFollowersAndFollowingCount(coderId);

    const isFollowing = await this._followerRepository.findFollowerByUserIdAndFolloweeId(requestedUser?._id as string, coderId);
    

    const response = getCoderUsecaseMapper.toResponse({...coder,account,...followerCount,isFollowing:isFollowing !== null});

    return response;

    };

  }

