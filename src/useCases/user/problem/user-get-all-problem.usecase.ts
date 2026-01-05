import { inject, injectable } from 'tsyringe';
import {
  IUserGetAllProblemsUsecaseInput,
  IUserGetAllProblemsUsecaseOutput,
} from '../../dtos/admin.dto';
import { IUserGetAllProblemsUsecase } from '../../Interfaces/users/problem/user-get-all-problems.usecase.interface';
import { IProblemRepository } from '../../../domain/repositoryInterfaces/problem-repository.interface';
import { GenericFilter, Projection, Sort } from '../../../shared/constant';
import { userGetAllProblemsUsecaseMapper } from '../../dtos/mappers/mappers';

@injectable()
export class UserGetAllProblemsUsecase implements IUserGetAllProblemsUsecase {
  constructor(@inject('IProblemRepository') private _problemRepository: IProblemRepository) {}

  async execute(data: IUserGetAllProblemsUsecaseInput): Promise<IUserGetAllProblemsUsecaseOutput> {
    const relations = ['skillsIds'];
    const projections: Projection = [
      '_id',
      'title',
      'problemNumber',
      'skillsIds',
      'difficulty',
      'view',
      'isPremium',
    ];

    const filter: GenericFilter = {
      title: { op: 'contains', value: data.search || '' },
      view: { op: 'eq', value: 'public' },
      ...(data.difficulty && { difficulty: { op: 'eq', value: data.difficulty || 'easy' } }),
      ...(data.skill && { skillsIds: { op: 'in', value: data.skill || '' } }),
    };

    const limit = 5;
    const skip = (data.page - 1) * limit;
    const sort: Sort = { problemNumber: 'asc' };

    const doc = await this._problemRepository.getAllProblems({
      filter,
      limit,
      skip,
      projections,
      relations,
      sort,
    });
    const totalPages = Math.ceil(doc.total / limit);

    const problems = doc.problems.map((s) => userGetAllProblemsUsecaseMapper.toResponse(s));

    return {
      problems,
      totalPages,
      currentPage: data.page,
    };
  }
}
