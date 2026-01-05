import { IUpdateProblemUsecaseInput } from '../../../dtos/admin.dto';

export interface IUpdateProblemUsecase {
  execute(data: IUpdateProblemUsecaseInput): Promise<void>;
}
