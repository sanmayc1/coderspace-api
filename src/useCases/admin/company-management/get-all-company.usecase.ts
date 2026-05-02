import { inject, injectable } from 'tsyringe';
import { IGetAllCompaniesUsecase } from '../../Interfaces/admin/company-management/get-all-companies.usecase.interface';
import { ICompanyRepository } from '../../../domain/repositoryInterfaces/company-repository.interface';
import { GenericFilter } from '../../../shared/constant';

import { IGetAllCompaniesUsecaseOutputDto } from '../../dtos/admin.dto';

@injectable()
export class GetAllCompaniesUsecase implements IGetAllCompaniesUsecase {
  constructor(@inject('ICompanyRepository') private _companyRepository: ICompanyRepository) {}
  async execute(data: {
    page: number;
    limit: number;
    search: string;
    filter: string;
  }): Promise<IGetAllCompaniesUsecaseOutputDto> {
    const filter: GenericFilter = {};

   

    if (data.filter.trim() && data.filter !== 'All') {
      if (data.filter === 'APPROVED') {
        filter.isApproved = { op: 'eq', value: true };
      }

      if (data.filter === 'UNAPPROVED') filter.isApproved = { op: 'eq', value: false };
    }

    if(data.search){
        filter.name = {op:"contains",value:data.search.trim()}
    }

    const skip =  data.limit  * (data.page - 1) ;
   
    const relations = ['accountId']

    const { companies, count } = await this._companyRepository.getAllCompanies({
      filter,
      limit: data.limit,
      skip,
      relations
    });

    const totalPages = Math.ceil(count / data.limit);

    const formattedCompanies = companies.map((company: any) => ({
      name: company.accountId?.name || '',
      email: company.accountId?.email || '',
      gstNumber: company.gstin || '',
      isBlocked: company.accountId?.isBlocked || false,
      isApproved: company.isApproved || false,
      certificateUrl: company.certificateUrl || '',
      accountId: company.accountId?._id || '',
      remarks: company.remarks || '',
    }));

    return {
      companies: formattedCompanies,
      totalPages,
      currentPage: data.page,
    };
  }
}
