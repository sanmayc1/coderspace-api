import { IGetAllTestcaseUsecaseOutputDto } from '../../../dtos/admin.dto';

export interface IGetAllTestcaseUsecase {
  execute(problemId: string): Promise<IGetAllTestcaseUsecaseOutputDto[]>;
}
