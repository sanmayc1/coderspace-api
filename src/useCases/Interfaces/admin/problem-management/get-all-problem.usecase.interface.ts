


import { IGetAllProblemUsecaseInputDto, IGetAllProblemUsecaseOutputDto } from "../../../dtos/admin.dto.js";

export interface IGetAllProblemsUsecase {
  execute(data:IGetAllProblemUsecaseInputDto): Promise<IGetAllProblemUsecaseOutputDto>;
}