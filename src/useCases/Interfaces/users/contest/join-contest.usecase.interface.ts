


export interface IJoinContestUsecase {
  execute(contestId: string,accountId: string): Promise<void>;
}