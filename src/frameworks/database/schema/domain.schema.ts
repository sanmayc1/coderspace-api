import { Schema } from "mongoose";
import { IDomainModel } from "../models/domain.model.js";



export const  domainSchema = new  Schema<IDomainModel>({

  title:{
    type:String,
    required:true
  }
},{timestamps:true})