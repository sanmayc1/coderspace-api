import { inject, injectable } from "tsyringe";
import { ISendOtpUsecase } from "../../entities/useCaseInterfaces/auth/sendOtp.usecase.js";
import { IOTPService } from "../../entities/services/otpService.interface.js";
import { IEmailService } from "../../entities/services/emailService.interface.js";
import { IUserReopository } from "../../entities/repositoryInterfaces/user/user-repository.interface.js";

@injectable()
export class SendOtpUsecase implements ISendOtpUsecase {
  constructor(
    @inject("IOtpService") private _otpService: IOTPService,
    @inject("IEmailService") private _emailService: IEmailService,
    @inject("IUserRepository") private _userRepo: IUserReopository
  ) {}
  async execute(email: string): Promise<void> {
    const existUser = this._userRepo.findByEmail(email);

  }
}
