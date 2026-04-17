import { injectable } from 'tsyringe';
import { ISubmitProblemRepository } from '../../domain/repositoryInterfaces/submit-problem-repository.interface';
import { ISubmitProblemEntity } from '../../domain/entities/submit-problem.entity';
import { BaseRepository } from './base-repository';
import {
  ISubmitProblemModel,
  SubmitProblemModel,
} from '../../frameworks/database/models/submit-problem.model';
import { submitProblemRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import mongoose from 'mongoose';

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
  async getAllSolvedProblemsCount(userId: string): Promise<number> {
    const id = new mongoose.Types.ObjectId(userId);
    const doc = await SubmitProblemModel.aggregate([
      {
        $match: {
          userId: id,
          status: 'solved',
        },
      },
      {
        $group: {
          _id: '$problemId',
        },
      },
      {
        $count: 'count',
      },
    ]);
    return doc[0]?.count || 0;
  }
  async getAllSubmissionByProblemIdAndUserId(
    problemId: string,
    userId: string
  ): Promise<ISubmitProblemEntity[]> {
    const doc = await SubmitProblemModel.find({ problemId, userId }).sort({ createdAt: 1 });
    return doc ? doc.map((s) => submitProblemRepositoryMapper.toEntity(s)) : [];
  }
}
