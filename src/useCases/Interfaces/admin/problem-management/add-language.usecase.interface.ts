import { IAddLanguageUsecaseInputDto } from '../../../dtos/admin.dto';

export interface IAddLanguageUsecase {
  execute(data: IAddLanguageUsecaseInputDto): Promise<void>;
}
