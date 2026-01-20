import { injectable } from 'tsyringe';
import { ITestcaseEntity } from '../../domain/entities/testcase-entity';
import { ITestcaseRepository } from '../../domain/repositoryInterfaces/testcase-respository.interface';
import { testcaseRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { ITestcaseModel, TestcaseModel } from '../../frameworks/database/models/testcase.model';
import { BaseRepository } from './base-repository';
import { IMongoOptions } from '../../domain/repositoryInterfaces/problem-repository.interface';
import {
  convertToMongoFilter,
  convertToMongoProjection,
  convertToMongoSort,
} from '../../shared/utils/mongo-utils';

@injectable()
export class TestcaseRepository
  extends BaseRepository<ITestcaseModel, ITestcaseEntity>
  implements ITestcaseRepository
{
  constructor() {
    super(TestcaseModel, testcaseRepositoryMapper.toEntity, testcaseRepositoryMapper.toModel);
  }
  async getTestcasesByProblemId(
    problemId: string,
    options?: Partial<IMongoOptions>
  ): Promise<ITestcaseEntity[]> {
    const filter = options?.filter ? convertToMongoFilter(options.filter) : {};
    const projection = options?.projections ? convertToMongoProjection(options.projections) : {};
    const sort = options?.sort ? convertToMongoSort(options.sort) : {};
    const relations = options?.relations ? options.relations.join(' ') : '';
    const skip = options?.skip ?? 0;
    const query = TestcaseModel.find({ problemId }, projection)
      .populate(relations)
      .sort(sort)
      .skip(skip);

    if (options?.limit !== undefined) {
      query.limit(options.limit);
    }

    const testcases = await query;
    return testcases.map((testcase) => testcaseRepositoryMapper.toEntity(testcase));
  }
}
