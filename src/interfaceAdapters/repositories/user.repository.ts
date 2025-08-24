import { injectable } from "tsyringe";
import { IUserEntity } from "../../entities/models/user.entity.js";
import { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import { UserModel } from "../../frameworks/database/models/user.model.js";
import { userMapperRepo } from "../../frameworks/database/dto.mapper.js";

@injectable()
export class UserRepository implements IUserRepository {
  async updateById(userId: string, data: Partial<IUserEntity>): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, data);
  }

  async findById(userId: string): Promise<IUserEntity | null> {
    const user = await UserModel.findById(userId);
    return user ? userMapperRepo.toEntity(user) : null;
  }

  async setUserVerified(email: string): Promise<void> {
    await UserModel.updateOne({ email }, { isVerified: true });
  }

  async findByUsernmae(username: string): Promise<IUserEntity | null> {
    const user = await UserModel.findOne({ username });
    return user ? userMapperRepo.toEntity(user) : user;
  }

  async findByEmail(email: string): Promise<IUserEntity | null> {
    const user = await UserModel.findOne({ email });

    return user ? userMapperRepo.toEntity(user) : user;
  }

  async save(data: Partial<IUserEntity>): Promise<IUserEntity> {
    const user = await UserModel.create(data);
    return userMapperRepo.toEntity(user);
  }
}
