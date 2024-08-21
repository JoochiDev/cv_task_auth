export const {
  SECRET_JWT_KEY = "cristian-tokken-jwt-secret-123456-muchiwis",
  SALT_ROUNDS = 10,
} = process.env;

import dotenv from "dotenv";
dotenv.config();

const DB_HOST = process.env.DB_HOST ?? "localhost";
const DB_PORT = process.env.DB_PORT ?? "3306";
const DB_USER = process.env.DB_USER ?? "root";
const DB_PASSWORD = process.env.DB_PASSWORD ?? "";
const DB_NAME = process.env.DB_NAME ?? "task_auth";

// const DB_HOST = "localhost";
// const DB_PORT = "3306";
// const DB_USER = "root";
// const DB_PASSWORD = "";
// const DB_NAME = "task_auth";

export { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME };
