





export interface IDeleteInterviewUsecase {
    execute(id: string): Promise<void>;
}