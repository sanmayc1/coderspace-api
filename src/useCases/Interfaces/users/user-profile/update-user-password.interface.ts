import { IUpdateUserPasswordInputDto } from "../../../dtos/user.dto.js";

export interface IUpdateUserPasswordUsecase {
  execute(data: IUpdateUserPasswordInputDto): Promise<any>;
}
