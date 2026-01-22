import { IGetContestLeaderboardUsecaseOutputDto } from "../../../dtos/user.dto";




export interface IGetContestLeaderboardUsecase {
    execute(id: string): Promise<IGetContestLeaderboardUsecaseOutputDto[]>;
}