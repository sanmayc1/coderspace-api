import { IGetLanguageDetailsUsecaseOutput } from '../../../dtos/admin.dto';

export interface IGetLanguageDetailsUsecase {
  execute(id: string): Promise<IGetLanguageDetailsUsecaseOutput>;
}
