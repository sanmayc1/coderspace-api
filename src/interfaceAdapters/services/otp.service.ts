import { inject, injectable } from 'tsyringe';
import { IOtpService } from '../../domain/services/otp-service.interface';
import { IBcrypt } from '../../domain/services/bcrypt.interface';
import { IOtpRespository } from '../../domain/repositoryInterfaces/otp.interface';
import { IOtpEntity } from '../../domain/entities/otp.entity';

@injectable()
export class OtpService implements IOtpService {
  constructor(
    @inject('IBcrypt') private _bcrypt: IBcrypt,
    @inject('IOtpRepository') private _otpRepo: IOtpRespository
  ) {}
  async verifyOtp(current: string, original: string): Promise<boolean> {
    return await this._bcrypt.compare(current, original);
  }
  async storeOtp(email: string, otp: string): Promise<void> {
    const hashedOtp = await this._bcrypt.hash(otp);
    const now = new Date();
    const expiry = now.getTime() + 5 * 60 * 1000;

    await this._otpRepo.save({
      email,
      otp: hashedOtp,
      expiry,
    });
  }
  async deleteOtp(email: string): Promise<void> {
    await this._otpRepo.delete(email);
  }
  generateOtp(): string {
    const otp = Math.floor(Math.random() * 900000 + 100000).toString();
    return otp;
  }

  async otpExists(email: string): Promise<string | null> {
    return await this._otpRepo.findByEmail(email);
  }
}
