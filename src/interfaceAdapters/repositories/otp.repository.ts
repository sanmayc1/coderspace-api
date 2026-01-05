import { IOtpEntity } from '../../domain/entities/otp.entity';
import { IOtpRespository } from '../../domain/repositoryInterfaces/otp.interface';
import { redis } from '../../frameworks/cache/redis';
export class OtpRepository implements IOtpRespository {
  async delete(email: string): Promise<void> {
    
    await redis.del(`email:${email}`);
  }
  async save(data: IOtpEntity): Promise<void> {

    await redis.set(`email:${data.email}`, data.otp, 'EX', data.expiry);
  }
  async findByEmail(email: string): Promise<string | null> {
    return await redis.get(`email:${email}`);
  }
}
