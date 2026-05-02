import { IGetAllCodersUsecaseInput, IGetAllCodersUsecaseOutputDto } from "../../../dtos/user.dto";




export interface IGetAllCodersUsecase {
    execute(data:IGetAllCodersUsecaseInput): Promise<IGetAllCodersUsecaseOutputDto>;
}