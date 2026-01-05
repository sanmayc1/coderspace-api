import { IUpdateLanguageUsecaseInput } from '../../../dtos/admin.dto';

export interface IUpdateLanguageUsecase {
  execute(data: IUpdateLanguageUsecaseInput): Promise<void>;
}
