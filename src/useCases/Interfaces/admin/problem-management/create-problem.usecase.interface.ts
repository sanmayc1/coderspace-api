import { ICreateProblemUsecaseInputDto } from '../../../dtos/admin.dto';

export interface ICreateProblemUsecase {
  execute(data: ICreateProblemUsecaseInputDto): Promise<void>;
}
