import {
  IUserGetAllProblemsUsecaseInput,
  IUserGetAllProblemsUsecaseOutput,
} from '../../../dtos/admin.dto';

export interface IUserGetAllProblemsUsecase {
  execute(data: IUserGetAllProblemsUsecaseInput): Promise<IUserGetAllProblemsUsecaseOutput>;
}
