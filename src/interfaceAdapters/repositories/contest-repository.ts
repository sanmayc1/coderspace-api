import { injectable } from 'tsyringe';
import { BaseRepository } from './base-repository';
import { IContestModel, ContestModel } from '../../frameworks/database/models/contest.model';
import { IContestEntity } from '../../domain/entities/contest-entity';
import {
  ICompanyContestList,
  IContestRepository,
  IGetCompanyContestInput,
} from '../../domain/repositoryInterfaces/contest-repository.interface';
import { contestRepositoryMapper, problemRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { Types } from 'mongoose';
import { IMongoOptions } from '../../domain/repositoryInterfaces/problem-repository.interface';
import {
  convertToMongoFilter,
} from '../../shared/utils/mongo-utils';
import { IProblemEntity } from '../../domain/entities/problem-entity';
import { IProblemModel } from '../../frameworks/database/models/problem.model';
import mongoose from 'mongoose';

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

  async getAllContests(
    data: IMongoOptions
  ): Promise<{ contests: IContestEntity[]; count: number }> {
    const filter = data.filter ? convertToMongoFilter(data.filter) : {};
    const relations = data.relations ? data.relations.join(' ') : '';
    const skip = data.skip ?? 0;
    const limit = data.limit ?? 6;
    const [doc, total] = await Promise.all([
      ContestModel.find(filter)
        .populate(relations)
        .sort({ dateAndTime: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ContestModel.countDocuments(filter),
    ]);
    return {
      contests: doc.map(contestRepositoryMapper.toEntity),
      count: total,
    };
  }

  async getContestWithAllDetails(id: string): Promise<IContestEntity | null> {
    const doc = await ContestModel.findById(id)
      .populate('skillsIds')
      .populate('domainId')
      .populate('creatorId')
      .populate({
        path: 'problemsIds',
        populate: [{ path: 'skillsIds' }, { path: 'domainId' }],
      });

    return doc ? contestRepositoryMapper.toEntity(doc) : null;
  }

  async getAllProblemsOfContest(
    id: string
  ): Promise<{ problems: IProblemEntity[]; endDateAndTime: Date }> {
    const doc = await ContestModel.findById(id)
      .populate('problemsIds')
      .populate({
        path: 'problemsIds',
        populate: [{ path: 'skillsIds' }, { path: 'domainId' },{path:'addedLanguagesId'}],
      });
    
    return{
      problems:(doc?.problemsIds as IProblemModel[]).map(problemRepositoryMapper.toEntity),
      endDateAndTime:doc?.endDateAndTime as Date
    }
  }

  async getCompanyDashboardStats(creatorId: string): Promise<{ totalContests: number; activeContests: number; upcomingContests: number; totalParticipants: number; monthlyParticipantsData: { name: string; participants: number; submissions: number; }[] }> {
    const creatorObjectId = new Types.ObjectId(creatorId);
    const now = new Date();

    const [totalContests, activeContests, upcomingContests, contests] = await Promise.all([
      ContestModel.countDocuments({ creatorId: creatorObjectId }),
      ContestModel.countDocuments({ creatorId: creatorObjectId, dateAndTime: { $lte: now }, endDateAndTime: { $gte: now } }),
      ContestModel.countDocuments({ creatorId: creatorObjectId, dateAndTime: { $gt: now } }),
      ContestModel.find({ creatorId: creatorObjectId }).select('_id').lean()
    ]);

    const contestIds = contests.map((c: any) => c._id);
  
    const ContestAttemptModel = mongoose.model('ContestAttempt');

    const totalParticipants = await ContestAttemptModel.countDocuments({ contestId: { $in: contestIds } });

    const currentYear = new Date().getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const monthlyStats = await ContestAttemptModel.aggregate([
      {
        $match: {
          contestId: { $in: contestIds },
          startDateAndTime: {
            $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
            $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$startDateAndTime" },
          participants: { $sum: 1 },
          submissions: { $sum: { $cond: [{ $isNumber: "$totalSubmissions" }, "$totalSubmissions", 0] } }
        }
      }
    ]);

    const monthlyParticipantsData = months.map((name, index) => {
      const monthData = monthlyStats.find((stat: any) => stat._id === index + 1);
      return {
        name,
        participants: monthData ? monthData.participants : 0,
        submissions: monthData ? monthData.submissions : 0
      };
    });

    return {
      totalContests,
      activeContests,
      upcomingContests,
      totalParticipants,
      monthlyParticipantsData,
    };
  }
}
