import { Document, model, Types } from "mongoose";
import { IChatEntity } from "../../../domain/entities/chat-entity";
import chatSchema from "../schema/chat.schema";
import { IAccountsEntity } from "../../../domain/entities/accounts-entity";




export interface IChatModel extends Omit<IChatEntity ,"_id"| "senderId"|"receiverId"> , Document {
    _id:Types.ObjectId;
    senderId:Types.ObjectId | IAccountsEntity;
    receiverId:Types.ObjectId | IAccountsEntity;
}

export const ChatModel  = model<IChatModel>("Chat",chatSchema);