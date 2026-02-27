import { IGetChatUsecaseOutputDto } from "../../../dtos/user.dto";




export interface IGetChatUsecase {
    execute(accountId:string,receiverId:string):Promise<IGetChatUsecaseOutputDto>
}   