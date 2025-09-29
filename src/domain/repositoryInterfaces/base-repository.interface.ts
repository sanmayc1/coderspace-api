
export interface IBaseRepository< TEntity> {
  findById(id: string): Promise<TEntity | null>;
  create(data: Partial<TEntity>): Promise<TEntity>;
  updateById(id: string, data: Partial<TEntity>): Promise<TEntity | null>;
  deleteById(id: string): Promise<TEntity | null>;
}
