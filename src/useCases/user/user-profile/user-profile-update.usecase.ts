import { inject, injectable } from 'tsyringe';
import { IUpdateUserProfileInputDto } from '../../dtos/user.dto';
import { IUpdateUserProfileUsecase } from '../../Interfaces/users/user-profile/update-user-profile.usecase.interface';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { IImageStoreService } from '../../../domain/services/image-store.service.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { IAccountsRepository } from '../../../domain/repositoryInterfaces/accounts-repository.interface';
import { IAccountsEntity } from '../../../domain/entities/accounts-entity';
import { IUserEntity } from '../../../domain/entities/user.entity';

@injectable()
export class UpdateUserProfileUsecase implements IUpdateUserProfileUsecase {
  constructor(
    @inject('IAccountRepository')
    private _accountRepository: IAccountsRepository,
    @inject('IUserRepository')
    private _userRepository: IUserRepository,
    @inject('IImageStoreService') private _imageStoreService: IImageStoreService
  ) {}
  async execute(data: IUpdateUserProfileInputDto): Promise<any> {
    const { name, username, about, profileImage, accountId } = data;
    const accountUpadate: Partial<IAccountsEntity> = {};
    const userUpadate: Partial<IUserEntity> = {};
    const account = await this._accountRepository.findById(accountId);

    if (!account) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }
    const user = await this._userRepository.findByAccountId(accountId);
    if (!user) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.USER_NOT_FOUND);
    }
    if (profileImage) {
      const { url } = await this._imageStoreService.uploadImage(profileImage, 'profiles');
      accountUpadate.profileUrl = url;
    }

    if (account.name !== name) {
      accountUpadate.name = name;
    }

    if (username !== user.username) {
      const exist = await this._userRepository.findByUsername(username);
      if (exist) {
        throw new CustomError(HTTP_STATUS.CONFLICT, ERROR_MESSAGES.USERNAME_EXIST);
      }
      userUpadate.username = username;
    }

    if (about && about !== user.about) {
      userUpadate.about = about;
    }

    await this._userRepository.updateById(user._id as string, userUpadate);
    await this._accountRepository.updateById(accountId, accountUpadate);
  }
}
