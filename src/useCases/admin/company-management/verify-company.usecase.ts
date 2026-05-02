import { inject, injectable } from 'tsyringe';
import { ICompanyRepository } from '../../../domain/repositoryInterfaces/company-repository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { IVerifyCompanyUsecase } from '../../Interfaces/admin/company-management/verify-company.usecase.interface';

@injectable()
export class VerifyCompanyUsecase implements IVerifyCompanyUsecase {
  constructor(
    @inject('ICompanyRepository') private readonly _companyRepository: ICompanyRepository
  ) {}
  async execute(id: string): Promise<void> {
    const company = await this._companyRepository.findByAccountId(id);
    if (!company) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.COMPANY_NOT_FOUND);
    }

    await this._companyRepository.updateById(company._id as string, {
      isApproved: true,
      remarks: "",
    });
  }
}
