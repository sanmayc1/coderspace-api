



export interface IUpdateCompanyUsecase {
    execute(id:string,name:string):Promise<void>
}