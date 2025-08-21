import { inject, injectable } from "tsyringe";
import { IVerifyOtpUsecase } from "../../entities/useCaseInterfaces/auth/verifyOtp.usecase.interface.js";
import { IOtpService } from "../../entities/services/otpService.interface.js";
import { CustomError } from "../../entities/utils/errors/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";

@injectable()
export class VerifyOtpUsecase implements IVerifyOtpUsecase {
  constructor(
    @inject("IOtpService") private _otpService: IOtpService,
    @inject("IUserRepository") private _userRepo: IUserRepository
  ) {}
  async execute(email: string, otp: string): Promise<void> {
    const otpExist = await this._otpService.otpExists(email);

    if (!otpExist) {
      throw new CustomError(HTTP_STATUS.GONE, ERROR_MESSAGES.OTP_EXPIRE);
    }

    const isVerified = await this._otpService.verifyOtp(otp, otpExist.otp);

    if (!isVerified) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_OTP
      );
    }

    await this._userRepo.setUserVerified(email);
  }
}
