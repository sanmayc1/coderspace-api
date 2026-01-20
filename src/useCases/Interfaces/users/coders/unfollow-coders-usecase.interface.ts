



export interface IUnfollowCodersUsecase {
    execute(accountId:string,followingId:string): Promise<void>
}