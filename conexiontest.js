import mysql from "mysql2/promise";
// const config = {
//   host: "mysql-4ncz.railway.internal",
//   user: "root",
//   password: "cSHuCbgZUmVmsDNtSrWcFrLIibBBFWNM",
//   database: "railway",
//   port: "3306",
// };
const url =
  "mysql://root:cSHuCbgZUmVmsDNtSrWcFrLIibBBFWNM@junction.proxy.rlwy.net:47211/railway";
export const conexion = await mysql.createConnection(url);
// async function conectar() {
//   try {
//     const conexion = await mysql.createConnection(url);
//     console.log("Conexión exitosa");
//   } catch (error) {
//     console.error("Error al conectar:", error);
//   }
// }

// conectar();
