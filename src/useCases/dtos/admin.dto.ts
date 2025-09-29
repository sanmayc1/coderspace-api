import { TBadge } from "../../shared/constant.js"


export interface IGetUsersUsecaseOutputDto{
   page:number
   totalPages:number
   users:IGetUsersUsecaseUserDto[]
}

export interface IGetUsersUsecaseUserDto {
    username:string
    email:string
    level:number
    badge:TBadge
    userId:string
    accountId:string
    blocked:boolean
    profileUrl?:string
}


export interface IGetUsersUsecaseInputDto{
    page:number
    sort:string
    search?:string
    limit:number
    blocked?:boolean
}

export interface IUpdateUserUsecaseInputDto {
    userId:string
    badge:string
    level:number
}