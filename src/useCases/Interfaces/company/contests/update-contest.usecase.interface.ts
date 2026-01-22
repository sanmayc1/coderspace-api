import { IUpdateContestInputDto } from "../../../dtos/company.dto";



export interface IUpdateContestUseCaseInterface {
    execute(data: IUpdateContestInputDto): Promise<any>;
}