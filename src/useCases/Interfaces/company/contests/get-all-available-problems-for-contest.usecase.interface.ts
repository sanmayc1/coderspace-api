import { IGetAllAvailableProblemsForContestUsecaseOutput } from "../../../dtos/company.dto";






export interface IGetAllAvailableProblemsForContestUsecase{
    executes():Promise<IGetAllAvailableProblemsForContestUsecaseOutput>

}