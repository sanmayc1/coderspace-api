export interface ICompanyEntity {
  _id?: string;
  gstin: string;
  accountId: string;
  createdAt?: Date;
  isApproved:boolean;
  certificateUrl:string
  remarks:string
  updtedAt?: Date;
}
