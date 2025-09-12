import { IUserEntity } from "../models/user.entity.js";

export interface IUserRepository {
  save(data: Partial<IUserEntity>): Promise<IUserEntity>;
  findByUsername(username: string): Promise<IUserEntity | null>;
  findById(userId: string): Promise<IUserEntity | null>;
  updateById(userId:string,data:Partial<IUserEntity>):Promise<void>
  findByAccountId(id:string):Promise<IUserEntity |null>
}
