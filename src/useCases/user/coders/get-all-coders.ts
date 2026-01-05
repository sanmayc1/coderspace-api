import { inject, injectable } from "tsyringe";
import { IGetAllCodersUsecase } from "../../Interfaces/users/coders/get-all-coders.interface";
import { IUserRepository } from "../../../domain/repositoryInterfaces/user-repository.interface";
import { getAllCodersUsecaseMapper } from "../../dtos/mappers/mappers";
import { IGetAllCodersUsecaseOutputDto } from "../../dtos/user.dto";



@injectable()
export class GetAllCoders implements IGetAllCodersUsecase {
    
    constructor(@inject("IUserRepository") private _userRepository: IUserRepository){

    }

    async execute(accountId:string): Promise<IGetAllCodersUsecaseOutputDto[]> {
        const users = await this._userRepository.getAllUsersWithFollowing()
       
        return users.map(user=>getAllCodersUsecaseMapper.toResponse(user))
    }
}
