import { inject, injectable } from 'tsyringe';
import { IDeleteDomainUsecase } from '../../Interfaces/admin/skills-and-domain-management/delete-domain.usecase.interface';
import { IDomainRepository } from '../../../domain/repositoryInterfaces/domain-respository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';

@injectable()
export class DeleteDomainUsecase implements IDeleteDomainUsecase {
  constructor(@inject('IDomainRepository') private _domainRepository: IDomainRepository) {}
  async execute(id: string): Promise<void> {
    const exists = await this._domainRepository.findById(id);

    if (!exists) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.DOMAIN_NOT_FOUND);
    }

    await this._domainRepository.deleteById(id);
  }
}
