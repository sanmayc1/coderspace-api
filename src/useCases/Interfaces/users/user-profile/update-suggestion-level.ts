import { IUpdateSuggestionLevelInputDto } from '../../../dtos/user.dto';

export interface IUpdateSuggestionLevelUsecase {
  execute(data: IUpdateSuggestionLevelInputDto): Promise<void>;
}
