import { ICreateProblemUsecaseInputDto } from "../../../dtos/admin.dto.js";

export interface ICreateProblemUsecase {
  execute(data: ICreateProblemUsecaseInputDto): Promise<void>;
}
