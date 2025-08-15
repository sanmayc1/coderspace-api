import { IUserEntity } from "../../../entities/models/user.entity.js";
import { IUserReopository } from "../../../entities/repositoryInterfaces/user/user-repository.interface.js";


export class UserRepository implements IUserReopository{
    findByEmail(email: string): Promise<IUserEntity | null> {
        console.log(email)
        throw new Error("Method not implemented.");
    }
    save(data: Partial<IUserEntity>): Promise<IUserEntity> {
        throw new Error("Method not implemented.");
    }

} 
