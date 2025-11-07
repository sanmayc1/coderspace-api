import {
  IGetUsersUsecaseOutputDto,
  IGetUsersUsecaseInputDto,
} from "../../../dtos/admin.dto.js";

export interface IGetUsersUsecase {
  execute(data: IGetUsersUsecaseInputDto): Promise<IGetUsersUsecaseOutputDto>;
}
