import { IUserEntity } from "../../entities/models/user.entity.js";
import { UserRegisterRequestDto } from "../dtos/auth.dto.js";


export const UserMapper = {
    
    toEntity(data:UserRegisterRequestDto):IUserEntity{
      return {
        name:data.name,
        email:data.email,
        username:data.username,
        password:data.password,
      }
    }
}