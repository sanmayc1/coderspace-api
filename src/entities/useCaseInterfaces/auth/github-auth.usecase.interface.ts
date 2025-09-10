

export interface IGithHubAuthUsecaseOutput{
    statusCode:number
    message?:string
    accessToken?:string
    refreshToken?:string,
    deviceId?:string
}


export interface IGithHubAuthUsecase{
    execute(sessionState:string,state:string,code:string):Promise<IGithHubAuthUsecaseOutput>
}