import { IAuthProviderUsecaseOutputDto } from "../../dtos/auth.dto.js";



export interface IGithHubAuthUsecase{
    execute(sessionState:string,state:string,code:string):Promise<IAuthProviderUsecaseOutputDto>
}