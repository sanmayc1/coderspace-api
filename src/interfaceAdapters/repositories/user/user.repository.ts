import { injectable } from "tsyringe";
import { IUserEntity } from "../../../entities/models/user.entity.js";
import { IUserReopository } from "../../../entities/repositoryInterfaces/user/user-repository.interface.js";
import { IUserModel, UserModel } from "../../../frameworks/database/models/user.model.js";

@injectable()
export class UserRepository implements IUserReopository {
 async findByUsernmae(username: string): Promise<IUserModel | null> {
     return await UserModel.findOne({username})
  }
  async findByEmail(email: string): Promise<IUserModel | null> {
    return await UserModel.findOne({ email });
  }
  async save(data: Partial<IUserEntity>): Promise<IUserModel> {
    return await UserModel.create(data);
  }
}

