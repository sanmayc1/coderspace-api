import { Schema } from 'mongoose';
import { ICompanyModel } from '../models/company.model';

export const companySchema = new Schema<ICompanyModel>(
  {
    gstin: {
      type: String,
      required: true,
    },
    accountId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Account',
    },
    isApproved:{
      type:Boolean,
      required:true,
      default:false
    },
    certificateUrl:{
      type:String,
      required:true,
      default:""
    },
    remarks:{
      type:String,
    }
  },
  { timestamps: true }
);
