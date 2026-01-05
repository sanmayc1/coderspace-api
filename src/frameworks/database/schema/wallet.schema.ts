import { Schema } from 'mongoose';
import { IWalletModel } from '../models/wallet.model';

export const walletSchema = new Schema<IWalletModel>({
  accountId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Account',
    index: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  contestAmount: {
    type: Number,
    default: 0,
  },
});
