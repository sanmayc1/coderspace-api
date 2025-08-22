import { ITokenEntity } from "../../models/token.entity.js";



export interface IRefreshTokenUsecase {
     execute(refreshToken:string):Promise<Omit<ITokenEntity,"refreshToken">>
}