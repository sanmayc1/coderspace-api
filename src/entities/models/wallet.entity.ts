
export interface IWalletEnitity {
  _id: string 
  userId: string 
  balance: number;
  contestAmount: number;
  userType:"user"|"company"|"admin"
  createdAt:Date
  updatedAt:Date

}
