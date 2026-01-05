import { inject, injectable } from 'tsyringe';
import { IVerifyOtpUsecase } from '../Interfaces/auth/verify-otp.usecase.interface';
import { IOtpService } from '../../domain/services/otp-service.interface';
import { CustomError } from '../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../shared/constant';
import { IAccountsRepository } from '../../domain/repositoryInterfaces/accounts-repository.interface';

@injectable()
export class VerifyOtpUsecase implements IVerifyOtpUsecase {
  constructor(
    @inject('IOtpService') private _otpService: IOtpService,
    @inject('IAccountRepository')
    private _accountRepository: IAccountsRepository
  ) {}
  async execute(email: string, otp: string): Promise<void> {
    const otpExist = await this._otpService.otpExists(email);

    if (!otpExist) {
      throw new CustomError(HTTP_STATUS.GONE, ERROR_MESSAGES.OTP_EXPIRE);
    }

    const isVerified = await this._otpService.verifyOtp(otp, otpExist);

    if (!isVerified) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_OTP);
    }

    await this._accountRepository.setAccountVerified(email);
  }
}
