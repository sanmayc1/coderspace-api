import { injectable } from 'tsyringe';
import { ISubmitProblemRepository } from '../../domain/repositoryInterfaces/submit-problem-repository.interface';
import { ISubmitProblemEntity } from '../../domain/entities/submit-problem.entity';
import { BaseRepository } from './base-repository';
import {
  ISubmitProblemModel,
  SubmitProblemModel,
} from '../../frameworks/database/models/submit-problem.model';
import { submitProblemRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';

@injectable()
export class SubmitProblemRepository
  extends BaseRepository<ISubmitProblemModel, ISubmitProblemEntity>
  implements ISubmitProblemRepository
{
  constructor() {
    super(
      SubmitProblemModel,
      submitProblemRepositoryMapper.toEntity,
      submitProblemRepositoryMapper.toModel
    );
  }
  async getAllSubmissionByProblemIdAndUserId(
    problemId: string,
    userId: string
  ): Promise<ISubmitProblemEntity[]> {
    const doc = await SubmitProblemModel.find({ problemId, userId }).sort({ createdAt: 1 });
    return doc ? doc.map((s) => submitProblemRepositoryMapper.toEntity(s)) : [];
  }
}
