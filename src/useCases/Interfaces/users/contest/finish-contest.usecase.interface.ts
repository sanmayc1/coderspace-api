


export interface IFinishContestUsecase {
    execute(contestId: string, accountId: string): Promise<void>;
}