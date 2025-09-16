import { inject, injectable } from "tsyringe";
import {
  IGetUsersUsecaseInputDto,
  IGetUsersUsecaseOutputDto,
} from "../../dtos/admin.dto.js";
import { IGetUsersUsecase } from "../../Interfaces/admin/user-management/get-users.usecase.interface.js";
import { IUserRepository } from "../../../entities/repositoryInterfaces/user-repository.interface.js";
import { getUsersUsecaseMapper } from "../../mappers/mappers.js";

@injectable()
export class GetUsersUsecase implements IGetUsersUsecase {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository,
  ) {}

  async execute(
    data: IGetUsersUsecaseInputDto
  ): Promise<IGetUsersUsecaseOutputDto> {
    const dataPerPages = 5;
    const skip = (data.page - 1) * dataPerPages;
    const limit = dataPerPages;

    const doc = await this._userRepository.getAllUsers(skip, limit);
    const mappedUsers = doc.users.map((user) =>
      getUsersUsecaseMapper.toUserDto(user)
    );

    const totalPages = Math.ceil(doc.count / dataPerPages)
    const response = getUsersUsecaseMapper.toRespone(mappedUsers,data.page,totalPages)




    return response
  }
}
