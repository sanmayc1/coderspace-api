import { inject, injectable } from 'tsyringe';
import { IGetAllCodersUsecase } from '../../Interfaces/users/coders/get-all-coders.usecase.interface';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { getAllCodersUsecaseMapper } from '../../dtos/mappers/mappers';
import { IGetAllCodersUsecaseInput, IGetAllCodersUsecaseOutputDto } from '../../dtos/user.dto';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';

@injectable()
export class GetAllCoders implements IGetAllCodersUsecase {
  constructor(@inject('IUserRepository') private _userRepository: IUserRepository) {}

  async execute(data: IGetAllCodersUsecaseInput): Promise<IGetAllCodersUsecaseOutputDto> {
    const requestedUser = await this._userRepository.findByAccountId(data.accountId);
    if (!requestedUser) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const limit = 9;
    const skip = (Number(data.page) - 1) * limit;

    const { users, count } = await this._userRepository.getAllUsersWithFollowing(
      requestedUser._id as string,
      skip,
      limit,
      data.search || '',
      data.sort || '',
      data.badge || ''
    );

    const totalPage = Math.ceil(count / limit);

    return getAllCodersUsecaseMapper.toResponse(users, Number(data.page), totalPage);
  }
}
