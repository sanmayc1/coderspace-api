import { injectable } from "tsyringe";
import { IPlanEntity } from "../../domain/entities/plan-entity";
import { IPlanRepository } from "../../domain/repositoryInterfaces/plan-repository.interface";
import { planRepositoryMapper } from "../../frameworks/database/dtoMappers/dto.mapper";
import { IPlanModel, PlanModel } from "../../frameworks/database/models/plan.model";
import { BaseRepository } from "./base-repository";




@injectable()
export class PlanRepository  extends BaseRepository<IPlanModel,IPlanEntity>  implements IPlanRepository {
   
    constructor(){
        super(PlanModel,planRepositoryMapper.toEntity,planRepositoryMapper.toModel);
    }

   async getAllPlans(): Promise<IPlanEntity[]> {
        const doc = await PlanModel.find()
        return doc.map(planRepositoryMapper.toEntity);
    }
    
}