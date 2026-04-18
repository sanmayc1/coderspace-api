


export interface IGetInterviewFeedbackUsecase {
    execute(sessionId:string):Promise<{feedback:string,rating:number}>;
}