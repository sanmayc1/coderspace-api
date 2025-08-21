import { IUserEntity } from "../models/user.entity.js";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUserEntity | null>;
  save(data: Partial<IUserEntity>): Promise<IUserEntity>;
  findByUsernmae(username: string): Promise<IUserEntity | null>;
  setUserVerified(email:string):Promise<void>
}
