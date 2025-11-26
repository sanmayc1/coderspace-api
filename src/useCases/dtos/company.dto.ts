

import { TView } from "../../shared/constant.js";

export interface IGetCompanyUsecaseOutputDto{
    companyName:string
    gstin:string
    email:string
    profileUrl:string
}

export interface IGetCompanyContestUsecaseInputDto {
  page: number;
  search: string;
}

export interface ICompanyContestDto {
  id: string;
  title: string;
  description: string;
  dateAndTime: Date;
  duration: number;
  view: TView;
}

export interface IGetCompanyContestUsecaseOutputDto {
  contests: ICompanyContestDto[];
  totalPages: number;
  currentPage: number;
}