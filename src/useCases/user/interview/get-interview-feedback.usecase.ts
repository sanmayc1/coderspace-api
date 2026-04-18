import { inject, injectable } from "tsyringe";
import { IGetInterviewFeedbackUsecase } from "../../Interfaces/users/interview/get-interview-feedback.usecase.interface";
import { IInterviewSessionRepository } from "../../../domain/repositoryInterfaces/interview-session-repository";
import { CustomError } from "../../../domain/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constant";




@injectable()
export class GetInterviewFeedbackUsecase implements IGetInterviewFeedbackUsecase {
    constructor(
        @inject('IInterviewSessionRepository')
        private _interviewSessionRepository: IInterviewSessionRepository,
  
    ) {}
    async execute(sessionId:string):Promise<{feedback:string,rating:number}>{
       
        const existSession = await this._interviewSessionRepository.findById(sessionId);
        if (!existSession) {
            throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.SESSION_NOT_FOUND);
        }

        return {
            feedback: existSession.overallFeedback as string,
            rating: existSession.finalScore as number,
        };
    }
}