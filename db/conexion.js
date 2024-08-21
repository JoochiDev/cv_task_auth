import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../utilidades/config.js";

const config = {
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_NAME,
};

export const conexion = await mysql.createConnection(config);

const url =
  "mysql://root:cSHuCbgZUmVmsDNtSrWcFrLIibBBFWNM@junction.proxy.rlwy.net:47211/railway";
// export const conexion = await mysql.createConnection(config);
/*export async function getConnection() {
  let connection;
  try {
    connection = await mysql.createConnection(config);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
    connection = null; // O lanzar el error si prefieres que se maneje en otro lugar
  }
  return connection;
}*/
