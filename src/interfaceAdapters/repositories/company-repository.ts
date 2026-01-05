import { injectable } from 'tsyringe';
import { ICompanyEntity } from '../../domain/entities/company-entity';
import { ICompanyRepository } from '../../domain/repositoryInterfaces/company-repository.interface';
import { CompanyModel, ICompanyModel } from '../../frameworks/database/models/company.model';
import { BaseRepository } from './base-repository';
import { companyRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';

@injectable()
export class CompanyRepository
  extends BaseRepository<ICompanyModel, ICompanyEntity>
  implements ICompanyRepository
{
  constructor() {
    super(CompanyModel, companyRepositoryMapper.toEntity, companyRepositoryMapper.toModel);
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
