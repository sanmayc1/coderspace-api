import { IAccountsEntity } from "./accounts-entity";


export interface IChatEntity{ 
    _id:string
    senderId:string | IAccountsEntity;
    receiverId:string | IAccountsEntity;
    content:string;
    seen:boolean
    createdAt:Date;
    updatedAt:Date;
}