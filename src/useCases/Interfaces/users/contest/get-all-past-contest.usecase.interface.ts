import { IGetAllPastContestUsecaseOutputDto } from "../../../dtos/user.dto";


export interface IGetAllPastContestUsecase{
    execute(page:number):Promise<IGetAllPastContestUsecaseOutputDto>
}