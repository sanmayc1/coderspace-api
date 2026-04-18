import { inject, injectable } from 'tsyringe';
import { IGetAllAvailableProblemsForContestUsecase } from '../../Interfaces/company/contests/get-all-available-problems-for-contest.usecase.interface';
import { IGetAllAvailableProblemsForContestUsecaseOutput } from '../../dtos/company.dto';
import { IProblemRepository } from '../../../domain/repositoryInterfaces/problem-repository.interface';
import { GenericFilter } from '../../../shared/constant';
import { getAllAvailableProblemsForContestUsecaseMapper } from '../../dtos/mappers/mappers';

@injectable()
export class GetAllAvailableProblemsForContestUsecase implements IGetAllAvailableProblemsForContestUsecase {
  constructor(@inject('IProblemRepository') private _problemRepository: IProblemRepository) {}
  async executes(): Promise<IGetAllAvailableProblemsForContestUsecaseOutput> {
    const filter: GenericFilter = {
      view: { op: 'eq', value: 'public' },
    };
    const doc = await this._problemRepository.getAllProblemWithoutLimit({ filter });
    const problems = getAllAvailableProblemsForContestUsecaseMapper.toResponse(doc)
    return problems
  }
}
