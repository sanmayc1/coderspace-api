import { TLanguages } from "../../shared/constant.js"



export interface ILanguageEntity {
    _id?:string
    language:TLanguages
    templateCode?:string
    solution?:string
    functionName?:string

}