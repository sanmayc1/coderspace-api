import { TView } from '../../shared/constant';
import { ICreateContestUsecaseInputDto } from './admin.dto';

export interface IGetCompanyUsecaseOutputDto {
  companyName: string;
  gstin: string;
  email: string;
  profileUrl: string;
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
  endDateAndTime: Date;
}

export interface IGetCompanyContestUsecaseOutputDto {
  contests: ICompanyContestDto[];
  totalPages: number;
  currentPage: number;
}

export interface IGetContestUsecaseOutputDto extends ICreateContestUsecaseInputDto {
 id:string;
}

export interface IUpdateContestInputDto extends ICreateContestUsecaseInputDto {
 id:string;
}

