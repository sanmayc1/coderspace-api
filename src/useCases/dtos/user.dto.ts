import { Rating } from "../../domain/entities/user.entity.js"
import { DIFFICULTY, TDifficulty } from "../../shared/constant.js"




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

export interface IUpdateSuggestionLevelInputDto{
    level:TDifficulty
    accountId:string
}