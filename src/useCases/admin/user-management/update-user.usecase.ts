import { inject, injectable } from 'tsyringe';
import { IUpdateUserUsecaseInputDto } from '../../dtos/admin.dto';
import { IUpdateUserUsecase } from '../../Interfaces/admin/user-management/update-user.usecase.interface';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS, TBadge } from '../../../shared/constant';

@injectable()
export class UpdateUserUsecase implements IUpdateUserUsecase {
  constructor(@inject('IUserRepository') private _userRepository: IUserRepository) {}
  async execute(data: IUpdateUserUsecaseInputDto): Promise<void> {
    const user = await this._userRepository.findById(data.userId);

    if (!user) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    let finalLevel = data.level ?? user.level;
    let finalBadge = (data.badge ?? user.badge) as TBadge;

    if (data.badge !== user.badge) {
      if (finalBadge === 'silver' && finalLevel >= 50) {
        finalLevel = 1;
      }

      if (finalBadge === 'gold' && (finalLevel < 50 || finalLevel === 100)) {
        finalLevel = 50;
      }

      if (finalBadge === 'platinum') {
        finalLevel = 100;
      }
    }

    if (data.level !== user.level) {
      if (finalLevel >= 100) finalBadge = 'platinum';
      else if (finalLevel >= 50) finalBadge = 'gold';
      else finalBadge = 'silver';
    }

    if (finalLevel === user.level && finalBadge === user.badge) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.UPTODATE);
    }

    await this._userRepository.updateById(data.userId, {
      level: finalLevel,
      badge: finalBadge,
    });
  }
}
