import { IGetAllUpcomingAndOngoingContestUsecaseOutputDto } from "../../../dtos/user.dto";




export interface IGetAllUpcomingAndOngoingContestUseCaseInterface {
    execute(page:number): Promise<IGetAllUpcomingAndOngoingContestUsecaseOutputDto>;
}