import { Model } from "mongoose";
import { IBaseRepository } from "../../domain/repositoryInterfaces/base-repository.interface.js";

export class BaseRepository<TDoc,TEntity> implements IBaseRepository< TEntity> {
  private model: Model<TDoc>;
  private toDomain:(doc:TDoc)=>TEntity
  private toModel:(data:Partial<TEntity>)=>Partial<TDoc>

  constructor(model: Model<TDoc>,toDomain:(doc:TDoc)=>TEntity,toModel:(data:Partial<TEntity>)=>Partial<TDoc>) {
    this.model = model;
    this.toDomain = toDomain
    this.toModel = toModel
  }

  async findById(id: string): Promise<TEntity | null> {
    const doc =  await this.model.findById(id).exec();
    return  doc ? this.toDomain(doc):null
  }
  async create(data: Partial<TEntity>): Promise<TEntity> {
    const doc =  await this.model.create(this.toModel(data));
    return this.toDomain(doc)
  }
  async updateById(id: string, data: Partial<TEntity>): Promise<TEntity | null> {
    const doc = await this.model.findByIdAndUpdate(id, this.toModel(data)).exec();
    return  doc ? this.toDomain(doc) :null
  }
  async deleteById(id: string): Promise<TEntity | null> {
    const doc = await this.model.findByIdAndDelete(id).exec();
    return  doc ? this.toDomain(doc):null
  }
}
