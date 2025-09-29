import { inject, injectable } from "tsyringe";
import { IUpdateUserUsecaseInputDto } from "../../dtos/admin.dto.js";
import { IUpdateUserUsecase } from "../../Interfaces/admin/user-management/update-user.usecase.interface.js";
import { IUserRepository } from "../../../domain/repositoryInterfaces/user-repository.interface.js";
import { CustomError } from "../../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS, TBadge } from "../../../shared/constant.js";
import { IUserEntity } from "../../../domain/entities/user.entity.js";




@injectable()
export class UpdateUserUsecase implements IUpdateUserUsecase{

    constructor(@inject("IUserRepository") private _userRepository:IUserRepository){}
   async execute(data: IUpdateUserUsecaseInputDto): Promise<void> {

      const user = await this._userRepository.findById(data.userId)



      if(!user){
        throw new CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.USER_NOT_FOUND)
      }

      if(user.badge === data.badge && user.level === data.level){
        throw new CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.UPTODATE)
      }
      
      const update:Partial<IUserEntity> = {}

      if(user.badge !== data.badge){
        update.badge = data.badge as TBadge
      }

      if(user.level !== data.level){
        update.level = data.level
      }

      await this._userRepository.updateById(data.userId,update)

     }

}