import { IAddSingleTestcaseInputDto } from '../../../dtos/admin.dto';
import { TLanguages } from '../../../../shared/constant';

export interface IAddSingleTestcaseUsecase {
  execute(
    input: IAddSingleTestcaseInputDto
  ): Promise<{ isAllPassed: boolean; passedLanguages: { language: TLanguages; isPassed: boolean }[] }>;
}
  