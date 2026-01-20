import { IGetAllPlansUsecaseOutputDto } from "../../dtos/user.dto";


export interface IGetAllPlansUseCase{
    execute():Promise<IGetAllPlansUsecaseOutputDto[]>
}