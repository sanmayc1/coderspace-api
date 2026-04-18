import { ICreateInterviewSessionUsecaseOutputDto } from '../../../dtos/user.dto';

export interface ICreateInterviewSessionUsecase {
  execute(interviewId: string,accountId:string): Promise<ICreateInterviewSessionUsecaseOutputDto>;
}
