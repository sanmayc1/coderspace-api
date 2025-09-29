



export interface IRefreshTokenUsecase {
     execute(refreshToken:string,deviceId:string):Promise<string>
}
