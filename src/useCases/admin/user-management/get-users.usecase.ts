import { inject, injectable } from "tsyringe";
import {
  IGetUsersUsecaseInputDto,
  IGetUsersUsecaseOutputDto,
} from "../../dtos/admin.dto.js";
import { IGetUsersUsecase } from "../../Interfaces/admin/user-management/get-users.usecase.interface.js";
import { IUserRepository } from "../../../domain/repositoryInterfaces/user-repository.interface.js";
import { getUsersUsecaseMapper } from "../../dtos/mappers/mappers.js";

@injectable()
export class GetUsersUsecase implements IGetUsersUsecase {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository
  ) {}

  async execute(
    data: IGetUsersUsecaseInputDto
  ): Promise<IGetUsersUsecaseOutputDto> {
    const dataPerPages = data.limit
    const skip = (data.page - 1) * dataPerPages;
   

    const doc = await this._userRepository.getAllUsers(skip, dataPerPages,data.search||"",data.sort);
    const mappedUsers = doc.users
      .filter((u) => u.accountId)
      .map((user) => getUsersUsecaseMapper.toUserDto(user));


    const totalPages = Math.ceil(doc.count / dataPerPages);
    const response = getUsersUsecaseMapper.toRespone(
      mappedUsers,
      data.page,
      totalPages
    );

    
    return response;
  }
}
