import { ITokenEntity } from "../../../entities/models/token.entity.js";



export interface IRefreshTokenUsecase {
     execute(refreshToken:string,deviceId:string):Promise<ITokenEntity>
}