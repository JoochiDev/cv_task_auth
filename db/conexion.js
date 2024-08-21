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
