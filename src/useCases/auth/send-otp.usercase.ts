import { inject, injectable } from "tsyringe";
import { ISendOtpUsecase } from "../Interfaces/auth/send-otp.usecase.js";
import { IOtpService } from "../../domain/services/otp-service.interface.js";
import { IEmailService } from "../../domain/services/email-service.interface.js";
import { CustomError } from "../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { otpEmailTemplate } from "../../shared/email-templates.js";
import { IAccountsRepository } from "../../domain/repositoryInterfaces/accounts-repository.interface.js";

@injectable()
export class SendOtpUsecase implements ISendOtpUsecase {
  constructor(
    @inject("IOtpService") private _otpService: IOtpService,
    @inject("IEmailService") private _emailService: IEmailService,
    @inject("IAccountRepository")
    private _accountRepository: IAccountsRepository
  ) {}
  async execute(email: string): Promise<void> {
    const existAccount = await this._accountRepository.findByEmail(email);

    if (!existAccount) {
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
    this._emailService.sendMail(
      email,
      content,
      "Your Coderspace Verification Code"
    );
    await this._otpService.storeOtp(email, otp);
  }
}
