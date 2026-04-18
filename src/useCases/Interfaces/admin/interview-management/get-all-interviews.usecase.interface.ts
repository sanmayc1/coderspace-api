import { IGetAllInterviewsUsecaseInputDto, IGetAllInterviewsUsecaseOutputDto } from "../../../dtos/admin.dto";


export interface IGetAllInterviewsUsecase {
    execute(query:IGetAllInterviewsUsecaseInputDto):Promise<IGetAllInterviewsUsecaseOutputDto>
}