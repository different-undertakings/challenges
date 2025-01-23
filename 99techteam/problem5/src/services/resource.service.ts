import databaseLayerService from "../db/database";
import { DataLayerService } from "../interfaces/data-layer-service.interface";
import { Resource, ResourceService } from "../interfaces/resource.interface";

const resourceBuilder = databaseLayerService("tasks");

const resourceService = (resourceBuilder: any): ResourceService => {
  const get = async (query: any) => {
    return resourceBuilder.get(query);
  };

  const getById = async (id: number): Promise<Resource> => {
    return resourceBuilder.getById(id);
  };

  const create = async (todo: Resource): Promise<number[]> => {
    return resourceBuilder.create(todo);
  };

  const updateById = async (
    id: number,
    todo: Partial<Resource>,
  ): Promise<number> => {
    return resourceBuilder.updateById(id, todo);
  };

  const deleteById = async (id: number): Promise<number> => {
    return resourceBuilder.deleteById(id);
  };

  return { get, getById, create, updateById, deleteById };
};

export default resourceService(resourceBuilder);
