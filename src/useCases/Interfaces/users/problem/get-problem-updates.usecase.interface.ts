import { IGetProblemUpdatesUsecaseInputDto, IGetProblemUpdatesUsecaseOutputDto } from "../../../dtos/user.dto";




export interface IGetProblemUpdatesUsecase {
    execute(data:IGetProblemUpdatesUsecaseInputDto): Promise<IGetProblemUpdatesUsecaseOutputDto>
}