
export interface IPasswordRestRepository{
    save(key:string,value:string,expire:number):Promise<void>
    find(key:string):Promise<string |null>
    del(key:string):Promise<void>
}