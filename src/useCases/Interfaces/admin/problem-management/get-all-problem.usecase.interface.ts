import {
  IGetAllProblemUsecaseInputDto,
  IGetAllProblemUsecaseOutputDto,
} from '../../../dtos/admin.dto';

export interface IGetAllProblemsUsecase {
  execute(data: IGetAllProblemUsecaseInputDto): Promise<IGetAllProblemUsecaseOutputDto>;
}
