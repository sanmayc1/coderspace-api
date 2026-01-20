import { ICreateContestUsecaseInputDto } from '../../../dtos/admin.dto';

export interface ICreateContestUsecase {
  execute(data: ICreateContestUsecaseInputDto, id: string): Promise<void>;
}
