import { IGetAllChatsUsecaseOutputDto } from "../../../dtos/user.dto";



export interface IGetAllChatsUsecase {
    execute(accountId: string): Promise<IGetAllChatsUsecaseOutputDto[]>;
}