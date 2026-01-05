import { inject, injectable } from 'tsyringe';
import { IGetUsersUsecaseInputDto, IGetUsersUsecaseOutputDto } from '../../dtos/admin.dto';
import { IGetUsersUsecase } from '../../Interfaces/admin/user-management/get-users.usecase.interface';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { getUsersUsecaseMapper } from '../../dtos/mappers/mappers';

@injectable()
export class GetUsersUsecase implements IGetUsersUsecase {
  constructor(@inject('IUserRepository') private _userRepository: IUserRepository) {}

  async execute(data: IGetUsersUsecaseInputDto): Promise<IGetUsersUsecaseOutputDto> {
    const dataPerPages = data.limit;
    const skip = (data.page - 1) * dataPerPages;

    const doc = await this._userRepository.getAllUsers(
      skip,
      dataPerPages,
      data.search || '',
      data.sort
    );
    const mappedUsers = doc.users
      .filter((u) => u.accountId)
      .map((user) => getUsersUsecaseMapper.toUserDto(user));

    const totalPages = Math.ceil(doc.count / dataPerPages);
    const response = getUsersUsecaseMapper.toRespone(mappedUsers, data.page, totalPages);

    return response;
  }
}
