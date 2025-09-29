import { inject, injectable } from "tsyringe";
import { IRegisterCompanyUsecase } from "../Interfaces/auth/register-company.js";
import { RegisterCompanyRequestDto } from "../dtos/auth.dto.js";
import { IBcrypt } from "../../domain/services/bcrypt.interface.js";
import { IWalletRepository } from "../../domain/repositoryInterfaces/wallet-repository.interface.js";
import { IAccountsRepository } from "../../domain/repositoryInterfaces/accounts-repository.interface.js";
import { ICompanyRepository } from "../../domain/repositoryInterfaces/company-repository.interface.js";
import { accountDtoMapper } from "../dtos/mappers/account.mapper.js";
import { CustomError } from "../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";

@injectable()
export class RegisterCompanyUsecase implements IRegisterCompanyUsecase {
  constructor(
    @inject("IBcrypt") private _bcrypt: IBcrypt,
    @inject("IWalletRepository") private _walletRepository: IWalletRepository,
    @inject("IAccountRepository")
    private _accountRepository: IAccountsRepository,
    @inject("ICompanyRepository") private _companyRepository: ICompanyRepository
  ) {}
  async execute(data: RegisterCompanyRequestDto): Promise<string> {
    const account = accountDtoMapper.toEntity(data);

    const existingAccount = await this._accountRepository.findByEmail(
      account.email
    );

    if (existingAccount) {
      throw new CustomError(
        HTTP_STATUS.CONFLICT,
        ERROR_MESSAGES.EMAIL_EXIST,
        "email"
      );
    }

    const existingGstin = await this._companyRepository.findByGstin(data.gstin);

    if (existingGstin) {
      throw new CustomError(
        HTTP_STATUS.CONFLICT,
        ERROR_MESSAGES.GSTIN_EXIST,
        "gstin"
      );
    }

    const hashedPassword = await this._bcrypt.hash(account.password as string);
    account.password = hashedPassword;
    account.role = "company"

    const newAccount = await this._accountRepository.create(account);

    await this._companyRepository.create({
      accountId: newAccount._id,
      gstin: data.gstin,
    });

    await this._walletRepository.create({ accountId: newAccount._id });

    return account.email;

  }
}
