import { IAddSingleTestcaseInputDto } from "../../../dtos/admin.dto.js";





export interface IAddSingleTestcaseUsecase {
    execute(input: IAddSingleTestcaseInputDto): Promise<void>
}