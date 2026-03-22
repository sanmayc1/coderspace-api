import { ICreateInterviewUsecaseInputDto } from "../../../dtos/user.dto";



export interface ICreateInterviewUseCase {
    execute(data:ICreateInterviewUsecaseInputDto):Promise<any>
}