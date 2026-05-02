import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { IGetAllCompaniesUsecase } from '../../../useCases/Interfaces/admin/company-management/get-all-companies.usecase.interface';
import { IVerifyCompanyUsecase } from '../../../useCases/Interfaces/admin/company-management/verify-company.usecase.interface';
import { commonResponse, SUCCESS_MESSAGES } from '../auth';
import { IRejectCompanyUsecase } from '../../../useCases/Interfaces/admin/company-management/reject-company.usecase.interface';

@injectable()
export class CompanyManagementController {
  constructor(
    @inject('IGetAllCompaniesUsecase') private _getAllCompaniesUsecase: IGetAllCompaniesUsecase,
    @inject('IVerifyCompanyUsecase') private _verifyCompanyUsecase: IVerifyCompanyUsecase,
    @inject('IRejectCompanyUsecase') private _rejectCompanyUsecase: IRejectCompanyUsecase
  ) {}

  async getAllCompanies(req: Request, res: Response) {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const search = req.query.search as string;
    const filter = req.query.filter as string;

    const response = await this._getAllCompaniesUsecase.execute({ page, limit, search, filter });
    res.status(200).json(commonResponse(true, SUCCESS_MESSAGES.GETALLCOMPANIES, response));
  }

  async verifyCompany(req: Request, res: Response) {
    await this._verifyCompanyUsecase.execute(req.params.id);
    res.status(200).json(commonResponse(true, SUCCESS_MESSAGES.COMPANY_VERIFIED));
  }

  async rejectCompany(req: Request, res: Response) {
    await this._rejectCompanyUsecase.execute(req.params.id,req.body.reason);
    res.status(200).json(commonResponse(true, SUCCESS_MESSAGES.COMPANY_REJECTED));
  }
}
