



export interface IRejectCompanyUsecase {
    execute(id: string , reason: string): Promise<void>;
}