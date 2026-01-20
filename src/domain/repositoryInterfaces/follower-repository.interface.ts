import { IFollowerEntity } from "../entities/follower-entity";
import { IBaseRepository } from "./base-repository.interface";




export interface IFollowerRepository extends IBaseRepository<IFollowerEntity> {

    countFollowersAndFollowingCount(userId:string):Promise<{followersCount:number,followingCount:number}>
    findFollowerByUserId(userId:string):Promise<IFollowerEntity[]>
    findFollowingByUserId(userId:string):Promise<IFollowerEntity[]>
    findFollowerByUserIdAndFolloweeId(userId:string,followerId:string):Promise<IFollowerEntity|null>
    
    
}