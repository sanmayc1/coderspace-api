import { IRunProblemUsecaseOutputDto } from "../../../dtos/user.dto";






export interface IRunProblemUsecase {
    execute(language: string, code: string, problemId: string): Promise<IRunProblemUsecaseOutputDto>;
}





