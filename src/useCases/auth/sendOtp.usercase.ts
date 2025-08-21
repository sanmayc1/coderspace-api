import { inject, injectable } from "tsyringe";
import { ISendOtpUsecase } from "../../entities/useCaseInterfaces/auth/sendOtp.usecase.js";
import { IOtpService } from "../../entities/services/otpService.interface.js";
import { IEmailService } from "../../entities/services/emailService.interface.js";
import { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import { CustomError } from "../../entities/utils/errors/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { EmailService } from "../../interfaceAdapters/services/email.service.js";
import { otpEmailTemplate } from "../../shared/emailTemplates.js";

@injectable()
export class SendOtpUsecase implements ISendOtpUsecase {
  constructor(
    @inject("IOtpService") private _otpService: IOtpService,
    @inject("IEmailService") private _emailService: IEmailService,
    @inject("IUserRepository") private _userRepo: IUserRepository
  ) {}
  async execute(email: string): Promise<void> {
    const existUser = await this._userRepo.findByEmail(email);

    if (!existUser) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.EMAIL_NOT_EXIST
      );
    }

    const existUserOtp = await this._otpService.otpExists(email);

    if (existUserOtp) {
      await this._otpService.deleteOtp(email);
    }

    const otp = this._otpService.generateOtp();
    const content = otpEmailTemplate(otp);
    this._emailService.sendMail(email, content);
    await this._otpService.storeOtp(email, otp);
  }
}
