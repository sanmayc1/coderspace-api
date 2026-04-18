import { IGetContestProblemUsecaseOutputDto } from "../../../dtos/user.dto";

export interface IGetContestProblemsUsecase {
  execute(id: string): Promise<IGetContestProblemUsecaseOutputDto>;
}
