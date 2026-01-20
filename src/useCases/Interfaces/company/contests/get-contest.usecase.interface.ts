import { IGetContestUsecaseOutputDto } from "../../../dtos/company.dto";


export interface IGetContestUsecase {
  execute(id: string): Promise<IGetContestUsecaseOutputDto>;
}