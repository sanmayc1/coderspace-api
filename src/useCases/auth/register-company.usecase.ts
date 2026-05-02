import { inject, injectable } from 'tsyringe';
import { IRegisterCompanyUsecase } from '../Interfaces/auth/register-company';
import { RegisterCompanyRequestDto } from '../dtos/auth.dto';
import { IBcrypt } from '../../domain/services/bcrypt.interface';
import { IWalletRepository } from '../../domain/repositoryInterfaces/wallet-repository.interface';
import { IAccountsRepository } from '../../domain/repositoryInterfaces/accounts-repository.interface';
import { ICompanyRepository } from '../../domain/repositoryInterfaces/company-repository.interface';
import { accountDtoMapper } from '../dtos/mappers/account.mapper';
import { CustomError } from '../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../shared/constant';
import { IImageStoreService } from '../../domain/services/image-store.service.interface';

@injectable()
export class RegisterCompanyUsecase implements IRegisterCompanyUsecase {
  constructor(
    @inject('IBcrypt') private _bcrypt: IBcrypt,
    @inject('IWalletRepository') private _walletRepository: IWalletRepository,
    @inject('IAccountRepository')
    private _accountRepository: IAccountsRepository,
    @inject('ICompanyRepository') private _companyRepository: ICompanyRepository,
    @inject('IImageStoreService') private _imageStoreService: IImageStoreService
  ) {}
  async execute(data: RegisterCompanyRequestDto): Promise<string> {
    const account = accountDtoMapper.toEntity(data);

    const existingAccount = await this._accountRepository.findByEmail(account.email);

    if (existingAccount) {
      throw new CustomError(HTTP_STATUS.CONFLICT, ERROR_MESSAGES.EMAIL_EXIST, 'email');
    }

    const existingGstin = await this._companyRepository.findByGstin(data.gstin);

    if (existingGstin) {
      throw new CustomError(HTTP_STATUS.CONFLICT, ERROR_MESSAGES.GSTIN_EXIST, 'gstin');
    }

    if (!data.companyRegistrationProof) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.COMPANY_REGISTRATION_PROOF_REQUIRED,
        'companyRegistrationProof'
      );
    }

    const hashedPassword = await this._bcrypt.hash(account.password as string);
    account.password = hashedPassword;
    account.role = 'company';

    const newAccount = await this._accountRepository.create(account);

    const { url } = await this._imageStoreService.uploadImage(
      data.companyRegistrationProof,
      'company-registrations'
    );
    
    await this._companyRepository.create({
      accountId: newAccount._id,
      gstin: data.gstin,
      certificateUrl: url,
    });

    await this._walletRepository.create({ accountId: newAccount._id });

    return account.email;
  }
}
