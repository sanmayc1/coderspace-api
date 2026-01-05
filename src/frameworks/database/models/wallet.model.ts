import { Document, model, ObjectId, Types } from 'mongoose';
import { IWalletEnitity } from '../../../domain/entities/wallet.entity';
import { walletSchema } from '../schema/wallet.schema';

export interface IWalletModel extends Omit<IWalletEnitity, '_id' | 'accountId'>, Document {
  _id: ObjectId;
  accountId: Types.ObjectId;
}

export const WalletModel = model('Wallet', walletSchema);
