import { injectable } from "tsyringe";
import { IUserEntity } from "../../domain/entities/user.entity.js";
import { IUserRepository } from "../../domain/repositoryInterfaces/user-repository.interface.js";
import {
  IUserModel,
  UserModel,
} from "../../frameworks/database/models/user.model.js";
import { userMapperRepo } from "../../frameworks/database/dtoMappers/dto.mapper.js";
import { BaseRepository } from "./base-repository.js";
import { USER_SORTING } from "../../shared/utils/mongo-utils.js";

@injectable()
export class UserRepository
  extends BaseRepository<IUserModel, IUserEntity>
  implements IUserRepository
{
  constructor() {
    super(UserModel, userMapperRepo.toEntity, userMapperRepo.toModel);
  }
  async getAllUsers(
    skip: number,
    limit: number,
    search: string,
    sort: string
  ): Promise<{ users: IUserEntity[] | []; count: number }> {
    const filter = {
      "accountId.isVerified": true,
      $or: [
        { "accountId.name": new RegExp(search, "i") },
        { "accountId.email": new RegExp(search, "i") },
        {"username":new RegExp(search, "i") }
      ],
    };

    const sortOption = USER_SORTING[sort as keyof typeof USER_SORTING];
    const doc = await UserModel.aggregate([
      {
        $lookup: {
          from: "accounts",
          localField: "accountId",
          foreignField: "_id",
          as: "accountId",
        },
      },
      { $unwind: { path: "$accountId", preserveNullAndEmptyArrays: true } },
      {$match:filter},
      ...(sortOption
        ? [{ $sort: sortOption as { [key: string]: -1 | 1 } }]
        : []),
      { $skip: skip },
      { $limit: limit },
    ]);

   
    const count = await UserModel.find()
      .populate({
        path: "accountId",
        match: { isVerified: true },
      })
      .countDocuments();

    return {
      users: doc.map((user) => userMapperRepo.toEntity(user)),
      count,
    };
  }
  async findByAccountId(id: string): Promise<IUserEntity | null> {
    const doc = await UserModel.findOne({ accountId: id });
    return doc ? userMapperRepo.toEntity(doc) : null;
  }



  async findByUsername(username: string): Promise<IUserEntity | null> {
    const user = await UserModel.findOne({ username });
    return user ? userMapperRepo.toEntity(user) : user;
  }


}
