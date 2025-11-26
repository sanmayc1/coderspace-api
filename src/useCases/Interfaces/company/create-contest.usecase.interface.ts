import { ICreateContestUsecaseInputDto } from "../../dtos/admin.dto.js";

export interface ICreateContestUsecase {
  execute(data: ICreateContestUsecaseInputDto,id:string): Promise<void>;
}

