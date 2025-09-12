import { IOtpEntity } from "../../entities/models/otp.entity.js";
import { IOtpRespository } from "../../entities/repositoryInterfaces/otp.interface.js";
import { otpMapper } from "../../frameworks/database/dtoMappers/dto.mapper.js";
import { OtpModel } from "../../frameworks/database/models/otp.model.js";

export class OtpRepository implements IOtpRespository {
  async delete(email: string): Promise<void> {
    await OtpModel.deleteOne({ email });
  }
  async save(data: Partial<IOtpEntity>): Promise<IOtpEntity> {
    const otpData = await OtpModel.create(data);
    return otpMapper.toEntity(otpData);
  }
  async findByEmail(email: string): Promise<IOtpEntity | null> {
    const otpData = await OtpModel.findOne({ email });
    return otpData ? otpMapper.toEntity(otpData) : null;
  }
}
