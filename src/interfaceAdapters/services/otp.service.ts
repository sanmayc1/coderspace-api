import { inject, injectable } from "tsyringe";
import { IOtpService } from "../../domain/services/otp-service.interface.js";
import { IBcrypt } from "../../domain/services/bcrypt.interface.js";
import { IOtpRespository } from "../../domain/repositoryInterfaces/otp.interface.js";
import { IOtpEntity } from "../../domain/entities/otp.entity.js";

@injectable()
export class OtpService implements IOtpService {
  constructor(
    @inject("IBcrypt") private _bcrypt: IBcrypt,
    @inject("IOtpRepository") private _otpRepo: IOtpRespository
  ) {}
  async verifyOtp(current: string, original: string): Promise<boolean> {
    return await this._bcrypt.compare(current, original);
  }
  async storeOtp(email: string, otp: string): Promise<IOtpEntity> {
    const hashedOtp = await this._bcrypt.hash(otp);
    const now = new Date();

    return await this._otpRepo.save({
      email,
      otp: hashedOtp,
      expiry: new Date(now.getTime() + 5 * 60 * 1000),
    });
  }
  async deleteOtp(email: string): Promise<void> {
    await this._otpRepo.delete(email);
  }
  generateOtp(): string {
    const otp = Math.floor(Math.random() * 900000 + 100000).toString();
    return otp;
  }

  async otpExists(email: string): Promise<IOtpEntity | null> {
    return await this._otpRepo.findByEmail(email);
  }
}
