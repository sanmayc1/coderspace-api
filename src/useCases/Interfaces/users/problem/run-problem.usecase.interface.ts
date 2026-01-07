





export interface IRunProblemUsecase {
    execute(language: string, code: string, problemId: string): Promise<void>;
}





