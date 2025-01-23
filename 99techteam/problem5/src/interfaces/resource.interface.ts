export interface Resource {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
  readonly updated_at: Date;
  readonly created_at: Date;
}

export interface ResourceService {
  get(query: unknown): Promise<Resource[]>;
  getById(id: number): Promise<Resource>;
  create(resource: Partial<Resource>): Promise<number[]>;
  updateById(id: number, resource: Partial<Resource>): Promise<number>;
  deleteById(id: number): Promise<number>;
}
