import { injectable } from "tsyringe";
import { IUserEntity } from "../../entities/models/user.entity.js";
import { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import { UserModel } from "../../frameworks/database/models/user.model.js";
import { userMapperRepo } from "../../frameworks/database/dto.mapper.js";

@injectable()
export class UserRepository implements IUserRepository {
  async setUserVerified(email: string): Promise<void> {
    await UserModel.updateOne({email},{isVerified:true})
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
