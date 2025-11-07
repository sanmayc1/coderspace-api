import { TParameterType, TDifficulty } from "../../shared/constant.js"
import { IDomainEntity } from "./domain-entity.js"
import { ISkillEntity } from "./skill-entity.js"


interface IParameter {
    name:string 
    type:TParameterType
}

interface IExample{
    parameters:{name:string,value:string}[]
    output:string
    explantion?:string
}

export interface IProblemEntity {
    _id?:string
    problemNumber:number
    title:string
    description:string
    functionName:string
    parameters:IParameter[]
    constraints:string
    difficulty:TDifficulty
    returnType:TParameterType
    solution:{
        javascript:string
        python:string
        java:string
        c:string
    }
    skillsIds:string|ISkillEntity[]
    examples:IExample[];
    domainId:string|IDomainEntity
    view:'public'|'private'
    isPremium:boolean
}

