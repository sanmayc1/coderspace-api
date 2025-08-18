import { injectable } from "tsyringe";
import { IUserEntity } from "../../../entities/models/user.entity.js";
import { IUserReopository } from "../../../entities/repositoryInterfaces/user/user-repository.interface.js";
import { UserModel } from "../../../frameworks/database/models/user.model.js";

@injectable()
export class UserRepository implements IUserReopository {
  async findByEmail(email: string): Promise<IUserEntity | null> {
    return await UserModel.findOne({ email });
  }
  async save(data: Partial<IUserEntity>): Promise<IUserEntity> {
    return await UserModel.create(data);
  }
}

