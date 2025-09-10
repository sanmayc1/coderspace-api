import { ObjectId } from "mongoose"
import { TRole } from "../../../shared/constant.js"

export interface UserRegisterRequestDto {
    name:string
    username:string
    email:string
    password:string,
    role:TRole
}


export interface UserRegisterResponseDto {
    userId:ObjectId
}

export interface UserLoginResponseDto{
   userId:string,
   email:string,
   isProfileComplete:boolean
}

