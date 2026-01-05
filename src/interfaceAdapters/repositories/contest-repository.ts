import { injectable } from 'tsyringe';
import { BaseRepository } from './base-repository';
import { IContestModel, ContestModel } from '../../frameworks/database/models/contest.model';
import { IContestEntity } from '../../domain/entities/contest-entity';
import {
  ICompanyContestList,
  IContestRepository,
  IGetCompanyContestInput,
} from '../../domain/repositoryInterfaces/contest-repository.interface';
import { contestRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { Types } from 'mongoose';

@injectable()
export class ContestRepository
  extends BaseRepository<IContestModel, IContestEntity>
  implements IContestRepository
{
  constructor() {
    super(ContestModel, contestRepositoryMapper.toEntity, contestRepositoryMapper.toModel);
  }

  async getCompanyContests(data: IGetCompanyContestInput): Promise<ICompanyContestList> {
    const filter: Record<string, unknown> = {
      creatorId: new Types.ObjectId(data.creatorId),
    };

    if (data.search) {
      filter.title = { $regex: data.search, $options: 'i' };
    }

    const [docs, total] = await Promise.all([
      ContestModel.find(filter).sort({ createdAt: -1 }).skip(data.skip).limit(data.limit).lean(),
      ContestModel.countDocuments(filter),
    ]);

    return {
      contests: docs.map(contestRepositoryMapper.toEntity),
      total,
    };
  }
}
