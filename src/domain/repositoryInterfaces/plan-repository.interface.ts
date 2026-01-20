import { IPlanEntity } from "../entities/plan-entity";
import { IBaseRepository } from "./base-repository.interface";



export interface IPlanRepository extends IBaseRepository<IPlanEntity>{

    getAllPlans():Promise<IPlanEntity[]>
    
    
}