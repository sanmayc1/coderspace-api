import { Rating } from "../../entities/models/user.entity.js"




export interface IGetUserUsecaseOutputDto {
    id:string
    name:string
    username:string
    xpCoin:number
    currentLevel:number
    currentBadge:string
    accountId:string
    about?:string
    premiumActive:boolean
    skills:Rating[]
}