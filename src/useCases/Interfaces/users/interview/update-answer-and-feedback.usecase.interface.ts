


export interface IUpdateAnswerAndFeedbackUsecase {
    
 execute(sessionId:string,order:number,answer:string):Promise<void>
}
