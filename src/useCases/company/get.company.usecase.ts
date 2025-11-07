import { inject, injectable } from "tsyringe";
import { IGetCompanyUsecase } from "../Interfaces/company/get-company.usecase.interface.js";
import { IAccountsRepository } from "../../domain/repositoryInterfaces/accounts-repository.interface.js";
import { ICompanyRepository } from "../../domain/repositoryInterfaces/company-repository.interface.js";
import { CustomError } from "../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IGetCompanyUsecaseOutputDto } from "../dtos/company.dto.js";
import { getCompanyUsecaseMapper } from "../dtos/mappers/mappers.js";

@injectable()
export class GetCompanyUsecase implements IGetCompanyUsecase {
  constructor(
    @inject("IAccountRepository")
    private _accountRepository: IAccountsRepository,
    @inject("ICompanyRepository") private _companyRepository: ICompanyRepository
  ) {}
  async execute(accountId: string): Promise<IGetCompanyUsecaseOutputDto> {
    const account = await this._accountRepository.findById(accountId);

    if (!account) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND
      );
    }

    const company = await this._companyRepository.findByAccountId(accountId);

    if (!company) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.COMPANY_NOT_FOUND
      );
    }

    const response = getCompanyUsecaseMapper.toResponse(account, company);

    return response;
  }
}
