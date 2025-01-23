export interface DataLayerService<T> {
  get(query: Partial<T>): Promise<T[]>;
  getById(id: number): Promise<T | undefined>;
  create(record: T): Promise<number[]>;
  updateById(id: number, record: Partial<T>): Promise<number>;
  deleteById(id: number): Promise<number>;
}
