import knex from "knex";
import config from "../../knexfile";
import { Resource } from "../interfaces/resource.interface";

const dataLayerService =
  <T>(config: any) =>
  (table: string) => {
    const db = knex(config);

    const get = async (query: any): Promise<any[]> => {
      const q = db(table);

      for (const [key, value] of Object.entries(query)) {
        if (key && value !== undefined) {
          q.where(key, value);
        }
      }

      return await q.select("*");
    };

    const getById = (id: number): Promise<any | undefined> =>
      db(table).where({ id }).first();

    const create = (record: Resource): Promise<number[]> =>
      db(table).insert(record);

    const updateById = (id: number, record: any): Promise<number> =>
      db(table).where({ id }).update(record);

    const deleteById = (id: number): Promise<number> =>
      db(table).where({ id }).del();

    return {
      get,
      getById,
      create,
      updateById,
      deleteById,
    };
  };

export default dataLayerService(config);
