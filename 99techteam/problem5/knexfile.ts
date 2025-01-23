import dotenv from "dotenv";
dotenv.config();

import { Knex } from "knex";

const knexConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    port: Number(process.env.DATABASE_PORT),
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "migrations",
  },
};

console.log({ knexConfig });

export default knexConfig;
