import { IOtpEntity } from '../entities/otp.entity';

export interface IOtpRespository {
  save(data: Partial<IOtpEntity>): Promise<void>;
  findByEmail(email: string): Promise<string | null>;
  delete(id: string): Promise<void>;
}
