import { injectable } from "tsyringe";
import { IUserEntity } from "../../entities/models/user.entity.js";
import { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import { UserModel } from "../../frameworks/database/models/user.model.js";
import { userMapperRepo } from "../../frameworks/database/dtoMappers/dto.mapper.js";

@injectable()
export class UserRepository implements IUserRepository {
  async findByAccountId(id: string): Promise<IUserEntity | null> {
    const doc = await UserModel.findOne({accountId:id})
    return doc ? userMapperRepo.toEntity(doc):null
  }

  async updateById(userId: string, data: Partial<IUserEntity>): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, data);
  }

  async findById(userId: string): Promise<IUserEntity | null> {
    const user = await UserModel.findById(userId);
    return user ? userMapperRepo.toEntity(user) : null;
  }

  async findByUsername(username: string): Promise<IUserEntity | null> {
    const user = await UserModel.findOne({ username })
    return user ? userMapperRepo.toEntity(user) : user;
  }

  async save(data: Partial<IUserEntity>): Promise<IUserEntity> {
    const user = await UserModel.create(data);
    return userMapperRepo.toEntity(user);
  }
  
}
