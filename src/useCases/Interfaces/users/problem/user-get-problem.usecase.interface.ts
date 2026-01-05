import { IUserGetProblemUsecaseOutput } from '../../../dtos/admin.dto';

export interface IUserGetProblemUsecase {
  execute(id: string): Promise<IUserGetProblemUsecaseOutput>;
}
