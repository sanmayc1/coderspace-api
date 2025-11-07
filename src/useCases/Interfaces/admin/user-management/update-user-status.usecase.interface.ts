



export interface IUpdateUserStatusUsecase {
    execute(accountId:string):Promise<void>
}