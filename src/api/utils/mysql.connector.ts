import { Connection, createConnection } from "mysql";
import { DATA_SOURCES } from "./../../config/vars.config";
import * as dotenv from "dotenv";
const dataSource = DATA_SOURCES.mySqlDataSource;

let connection: Connection;
dotenv.config({ path: __dirname + "/.env" });
/**
 * generates pool connection to be used throughout the app
 */
export const init = async () => {
  try {
    //need to use from .env file 
    connection = createConnection({
      host: "54.87.39.255",
      port: 3306,
      user: "root",
      password: "Hope00971!",
      database: "hopedatabase",
    });

    console.debug("MySql Adapter Pool generated successfully");
  } catch (error) {
    console.error("[mysql.connector][init][Error]: ", error);
    throw new Error("failed to initialized pool");
  }
};

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */
export const execute = async <T>(
  query: string,
  params: string[] | Object
): Promise<T> => {
  try {
    if (!connection)
      throw new Error(
        "Pool was not created. Ensure pool is created when running the app."
      );

    return new Promise<T>((resolve, reject) => {
      connection.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  } catch (error) {
    console.error("[mysql.connector][execute][Error]: ", error);
    throw new Error("failed to execute MySQL query");
  }
};
