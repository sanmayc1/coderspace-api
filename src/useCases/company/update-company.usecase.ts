import { inject, injectable } from "tsyringe";
import { ICompanyRepository } from "../../domain/repositoryInterfaces/company-repository.interface.js";
import { IUpdateCompanyUsecase } from "../Interfaces/company/update-company.usecase.interface.js";
import { CustomError } from "../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IAccountsRepository } from "../../domain/repositoryInterfaces/accounts-repository.interface.js";



@injectable()
export class UpdateCompanyUsecase implements IUpdateCompanyUsecase {
  constructor(
    @inject("IAccountRepository")
    private _accountRepository: IAccountsRepository,
  ) {}
  async execute(id: string,name:string): Promise<void> {
     
    const account = await this._accountRepository.findById(id)

    if(!account){
        throw new CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.COMPANY_NOT_FOUND)
    }

    await this._accountRepository.updateById(id,{name})

  }
}
