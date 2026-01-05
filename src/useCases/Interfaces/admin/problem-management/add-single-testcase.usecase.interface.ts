import { IAddSingleTestcaseInputDto } from '../../../dtos/admin.dto';

export interface IAddSingleTestcaseUsecase {
  execute(input: IAddSingleTestcaseInputDto): Promise<void>;
}
