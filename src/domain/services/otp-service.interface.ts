import { IOtpEntity } from '../entities/otp.entity';

export interface IOtpService {
  generateOtp(): string;
  verifyOtp(current: string, original: string): Promise<boolean>;
  storeOtp(email: string, otp: string): Promise<void>;
  deleteOtp(email: string): Promise<void>;
  otpExists(email: string): Promise<string | null>;
}
