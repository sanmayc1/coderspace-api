import {
  IContestProblemSubmitUsecaseInputDto,
  IContestProblemSubmitUsecaseOutputDto,
} from '../../../dtos/user.dto';

export interface IContestProblemSubmitUsecase {
  execute(
    data: IContestProblemSubmitUsecaseInputDto
  ): Promise<IContestProblemSubmitUsecaseOutputDto>;
}
