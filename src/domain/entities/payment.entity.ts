import { IAccountsEntity } from "./accounts-entity"
import { IPlanEntity } from "./plan-entity"


export interface IPaymentEntity {
    _id:string
    userId:string | IAccountsEntity
    razorpayOrderId:string
    razorpayPaymentId:string
    planId:string | IPlanEntity
    amount:number
    currency:string
    status:string
    createdAt:Date
    updatedAt:Date
}

