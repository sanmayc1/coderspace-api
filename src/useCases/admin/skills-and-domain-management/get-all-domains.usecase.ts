import { inject, injectable } from 'tsyringe';
import { IGetAllDomainsUsecaseOutput } from '../../dtos/admin.dto';
import { IGetAllDomainsUsecase } from '../../Interfaces/admin/skills-and-domain-management/get-all-domains.interface.usecase';
import { IDomainRepository } from '../../../domain/repositoryInterfaces/domain-respository.interface';
import { getAllDomainsUsecaseMapper } from '../../dtos/mappers/mappers';

@injectable()
export class GetAllDomains implements IGetAllDomainsUsecase {
  constructor(@inject('IDomainRepository') private _domainRepository: IDomainRepository) {}

  async executes(): Promise<IGetAllDomainsUsecaseOutput> {
    const domains = await this._domainRepository.getAll();

    const response = domains.map((d) => getAllDomainsUsecaseMapper.toResponse(d));

    return { domains: response };
  }
}
