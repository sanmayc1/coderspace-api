import { inject, injectable } from 'tsyringe';
import { IGetAllCodersUsecase } from '../../Interfaces/users/coders/get-all-coders.usecase.interface';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { getAllCodersUsecaseMapper } from '../../dtos/mappers/mappers';
import { IGetAllCodersUsecaseOutputDto } from '../../dtos/user.dto';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';

@injectable()
export class GetAllCoders implements IGetAllCodersUsecase {
  constructor(@inject('IUserRepository') private _userRepository: IUserRepository) {}

  async execute(accountId: string): Promise<IGetAllCodersUsecaseOutputDto[]> {
    const requestedUser = await this._userRepository.findByAccountId(accountId);
    if (!requestedUser) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const users = await this._userRepository.getAllUsersWithFollowing(requestedUser._id as string);
    return users.map((user) => getAllCodersUsecaseMapper.toResponse(user));
  }
}
