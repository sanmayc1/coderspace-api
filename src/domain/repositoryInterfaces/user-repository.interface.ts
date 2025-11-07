import { IUserEntity } from "../entities/user.entity.js";
import { IBaseRepository } from "./base-repository.interface.js";

export interface IUserRepository extends IBaseRepository<IUserEntity> {
  // create(data: Partial<IUserEntity>): Promise<IUserEntity>;
  findByUsername(username: string): Promise<IUserEntity | null>;
  // findById(userId: string): Promise<IUserEntity | null>;
  // updateById(userId: string, data: Partial<IUserEntity>): Promise<void>;
  findByAccountId(id: string): Promise<IUserEntity | null>;
  getAllUsers(
    skip: number,
    limit: number,
    search:string,
    sort:string
  ): Promise<{ users: IUserEntity[]| [], count: number } >;
}
