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

