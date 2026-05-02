import { inject, injectable } from 'tsyringe';
import { ICompanyRepository } from '../../../domain/repositoryInterfaces/company-repository.interface';
import { IRejectCompanyUsecase } from '../../Interfaces/admin/company-management/reject-company.usecase.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';

@injectable()
export class RejectCompanyUsecase implements IRejectCompanyUsecase {
  constructor(
    @inject('ICompanyRepository') private readonly _companyRepository: ICompanyRepository
  ) {}
  async execute(id: string, reason: string): Promise<void> {
    const company = await this._companyRepository.findByAccountId(id);
    if (!company) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.COMPANY_NOT_FOUND);
    }

    await this._companyRepository.updateById(company._id as string, { remarks: reason });
  }
}
