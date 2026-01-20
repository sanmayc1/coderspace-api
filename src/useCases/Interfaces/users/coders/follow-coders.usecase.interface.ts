

export interface IFollowCodersUsecase {
    execute(accountId:string,followingId:string): Promise<void>
}