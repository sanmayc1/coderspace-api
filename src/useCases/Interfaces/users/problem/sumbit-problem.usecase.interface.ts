import {
  ISubmitProblemUsecaseInputDto,
  ISubmitProblemUsecaseOutputDto,
} from '../../../dtos/user.dto';


export interface ISubmitProblemUsecase {
  execute(data: ISubmitProblemUsecaseInputDto): Promise<void>;
}
