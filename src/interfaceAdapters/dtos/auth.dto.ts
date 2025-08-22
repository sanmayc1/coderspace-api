import { ObjectId } from "mongoose"

export interface UserRegisterRequestDto {
    name:string
    username:string
    email:string
    password:string
}


export interface UserRegisterResponseDto {
    userId:ObjectId
}

export interface UserLoginResponseDto{
   userId:string,
   email:string,
   isProfileComplete:boolean
}

