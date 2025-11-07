import { injectable } from "tsyringe";
import { ICompanyEntity } from "../../domain/entities/company-entity.js";
import { ICompanyRepository } from "../../domain/repositoryInterfaces/company-repository.interface.js";
import {
  CompanyModel,
  ICompanyModel,
} from "../../frameworks/database/models/company.model.js";
import { BaseRepository } from "./base-repository.js";
import { companyRepositoryMapper } from "../../frameworks/database/dtoMappers/dto.mapper.js";

@injectable()
export class CompanyRepository
  extends BaseRepository<ICompanyModel, ICompanyEntity>
  implements ICompanyRepository
{
  constructor() {
    super(
      CompanyModel,
      companyRepositoryMapper.toEntity,
      companyRepositoryMapper.toModel
    );
  }
  async findByGstin(gstin: string): Promise<ICompanyEntity | null> {
    const doc = await CompanyModel.findOne({ gstin });
    return doc ? companyRepositoryMapper.toEntity(doc) : null;
  }
}
