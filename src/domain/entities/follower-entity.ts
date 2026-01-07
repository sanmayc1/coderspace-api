import { IUserEntity } from "./user.entity"



export interface IFollowerEntity {
    _id:string
    followerId:string |IUserEntity,
    followeeId:string |IUserEntity,
    createdAt?:Date,
    updatedAt?:Date
}