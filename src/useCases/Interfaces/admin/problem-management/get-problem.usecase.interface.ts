import { IGetProblemUsecaseOutput } from '../../../dtos/admin.dto';

export interface IGetProblemUsecase {
  execute(id: string): Promise<IGetProblemUsecaseOutput>;
}
