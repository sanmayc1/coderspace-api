import { IOtpEntity } from "../models/otp.entity.js";

export interface IOtpRespository {
  save(data:Partial<IOtpEntity>): Promise<IOtpEntity>;
  findByEmail(email: string): Promise<IOtpEntity | null>;
  delete(id: string): Promise<void>;
}
