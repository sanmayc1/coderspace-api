import { injectable } from 'tsyringe';
import { ICompanyEntity } from '../../domain/entities/company-entity';
import { ICompanyRepository } from '../../domain/repositoryInterfaces/company-repository.interface';
import { CompanyModel, ICompanyModel } from '../../frameworks/database/models/company.model';
import { BaseRepository } from './base-repository';
import { companyRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { IMongoOptions } from '../../domain/repositoryInterfaces/problem-repository.interface';
import { convertToMongoFilter } from '../../shared/utils/mongo-utils';
import { FilterCondition, GenericFilter } from '../../shared/constant';

@injectable()
export class CompanyRepository
  extends BaseRepository<ICompanyModel, ICompanyEntity>
  implements ICompanyRepository
{
  constructor() {
    super(CompanyModel, companyRepositoryMapper.toEntity, companyRepositoryMapper.toModel);
  }
  async getAllCompanies(data: IMongoOptions): Promise<{ companies: any[] | []; count: number; }> {
    const filter: any = {};
    const accountFilter: any = {};

    if (data.filter) {
      if (data.filter.name) {
        const searchValue = (data.filter.name as FilterCondition ).value ;
        accountFilter.$or = [
          { 'accountId.name': new RegExp(searchValue, 'i') },
          { 'accountId.email': new RegExp(searchValue, 'i') },
        ];
      }

      if (data.filter.isApproved !== undefined) {
        filter.isApproved = (data.filter.isApproved as FilterCondition ).value ;
      }
    }

    const pipeline: any[] = [
      {
        $lookup: {
          from: 'accounts',
          localField: 'accountId',
          foreignField: '_id',
          as: 'accountId',
        },
      },
      { $unwind: { path: '$accountId', preserveNullAndEmptyArrays: true } },
      { $match: { ...filter, ...accountFilter } },
    ];

    const countPipeline = [...pipeline, { $count: 'total' }];
    const countResult = await CompanyModel.aggregate(countPipeline);
    const count = countResult.length > 0 ? countResult[0].total : 0;

    const doc = await CompanyModel.aggregate([
      ...pipeline,
      { $sort: { createdAt: -1 } },
      ...(data.skip !== undefined ? [{ $skip: data.skip }] : []),
      ...(data.limit !== undefined ? [{ $limit: data.limit }] : []),
    ]);

    return {
      companies: doc,
      count,
    };
  }
  async findByAccountId(accountId: string): Promise<ICompanyEntity | null> {
    const doc = await CompanyModel.findOne({ accountId });
    return doc ? companyRepositoryMapper.toEntity(doc) : null;
  }

  async findByGstin(gstin: string): Promise<ICompanyEntity | null> {
    const doc = await CompanyModel.findOne({ gstin });
    return doc ? companyRepositoryMapper.toEntity(doc) : null;
  }
}
