import { inject, injectable } from "tsyringe";
import { ICreateProblemUsecaseInputDto } from "../../dtos/admin.dto.js";
import { ICreateProblemUsecase } from "../../Interfaces/admin/problem-management/create-problem.usecase.interface.js";
import { IProblemRepository } from "../../../domain/repositoryInterfaces/problem-repository.interface.js";
import { TDifficulty } from "../../../shared/constant.js";

@injectable()
export class CreateProblemUsecase implements ICreateProblemUsecase {
  constructor(
    @inject("IProblemRepository") private _problemRepository: IProblemRepository
  ) {}
  async execute(data: ICreateProblemUsecaseInputDto): Promise<void> {
 
    const problemCount = await this._problemRepository.findProblemCount()  

    await this._problemRepository.create({
      title: data.title.toLowerCase(),
      description: data.description,
      constraints: data.constrain,
      difficulty: data.difficulty as TDifficulty,
      domainId:data.domain,
      examples: data.examples.map((e)=>({explanation:e.explanation,input:e.input,output:e.output})),
      isPremium:data.premium,
      problemNumber:problemCount + 1,
      skillsIds:data.skills
    });
  }
}
