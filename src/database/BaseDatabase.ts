import knex, { Knex } from "knex";
import dotenv from 'dotenv';

dotenv.config();

export default class BaseDatabase {

  protected tableName = { user: "user" }

  protected connection: Knex = knex({
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  })

  static connection: any;

  public static async destroyConnection(): Promise<void> {
    await BaseDatabase.connection.destroy();
  }

}