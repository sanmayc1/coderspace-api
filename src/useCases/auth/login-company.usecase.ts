import { ILoginCompanyUsecase } from '../Interfaces/auth/login-company.usecase.interface';
import { inject, injectable } from 'tsyringe';
import { CustomError } from '../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../shared/constant';
import { IBcrypt } from '../../domain/services/bcrypt.interface';
import { IJwtService } from '../../domain/services/jwt-service.interface';
import { IUniqueIdService } from '../../domain/services/uuid.interface';
import { IAccountsRepository } from '../../domain/repositoryInterfaces/accounts-repository.interface';
import { IAccountsEntity } from '../../domain/entities/accounts-entity';
import { LoginUsecaseMapper } from '../dtos/mappers/register.usecase.mapper';
import { ILoginUsecaseOutputDto } from '../dtos/auth.dto';
import { ICompanyRepository } from '../../domain/repositoryInterfaces/company-repository.interface';

@injectable()
export class LoginCompanyUsecase implements ILoginCompanyUsecase {
  constructor(
    @inject('IBcrypt') private _bcrypt: IBcrypt,
    @inject('IJwtService') private _jwtService: IJwtService,
    @inject('IUniqueIdService') private _uniqueIdService: IUniqueIdService,
    @inject('IAccountRepository')
    private _accountRepository: IAccountsRepository,
    @inject('ICompanyRepository') private _companyRepository: ICompanyRepository
  ) {}
  async execute(
    data: Pick<IAccountsEntity, 'email' | 'password'>
  ): Promise<ILoginUsecaseOutputDto> {
    const account = await this._accountRepository.findByEmail(data.email);

    if (!account) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        'password'
      );
    }

    if (account.authProvider !== 'local') {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        'password'
      );
    }

    const isMatch = await this._bcrypt.compare(data.password as string, account.password as string);

    if (!isMatch) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        'password'
      );
    }

    if (!account.isVerified) {
      throw new CustomError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.ACCOUNT_NOT_VERIFIED);
    }

    if (account.role !== 'company') {
      throw new CustomError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.AUTH_ACCESS_DENIED, 'password');
    }

    if (account.isBlocked) {
      throw new CustomError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.ACCOUNT_BLOCKED, 'password');
    }

    const company = await this._companyRepository.findByAccountId(account._id as string);
    
    if (!company) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        'password'
      );
    }

    if (!company.isApproved && !company.remarks) {
      throw new CustomError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_MESSAGES.ADMIN_ONBOARD,
        'approval'
      );
    }

    if (!company.isApproved && company.remarks) {
      throw new CustomError(
        HTTP_STATUS.FORBIDDEN,
        company.remarks,
        'approval-rejected'
      );
    }

    const deviceId = this._uniqueIdService.generate();
    const accessToken = this._jwtService.signAccess({
      accountId: account._id,
      role: account.role,
      deviceId,
    });

    const refreshToken = this._jwtService.signRefresh({
      accountId: account._id,
      role: account.role,
      deviceId,
    });

    const response = LoginUsecaseMapper.toResponse(account);

    return {
      accessToken,
      refreshToken,
      deviceId,
      response,
    };
  }
}
