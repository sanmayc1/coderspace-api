import { IGetAllCodersUsecaseOutputDto } from "../../../dtos/user.dto";




export interface IGetAllCodersUsecase {
    execute(accountId:string): Promise<IGetAllCodersUsecaseOutputDto[]>;
}