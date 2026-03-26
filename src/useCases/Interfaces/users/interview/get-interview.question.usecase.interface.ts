import { IGetInterviewQuestionUsecaseOutputDto } from "../../../dtos/user.dto";



export interface IGetInterviewQuestionUsecase {
    execute(sessionId:string,order:number):Promise<IGetInterviewQuestionUsecaseOutputDto>;
}