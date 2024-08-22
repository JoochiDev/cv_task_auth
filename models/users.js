import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { conexion } from "../db/conexion.js";
import { SALT_ROUNDS } from "../utilidades/config.js";
export class userModel {
  static async login({ input }) {
    try {
      const username = input.username;
      const password = input.password_hash;
      const query = "SELECT * FROM users WHERE username = ?";

      const [resultado] = await conexion.query(query, [username]);
      if (resultado.length === 0) throw new Error("No existe el usuario");

      const validatePassword = await bcrypt.compare(
        password,
        resultado[0].password_hash
      );

      if (!validatePassword) throw new Error("La contraseña no coincide");

      return {
        success: true,
        message: "Login exitoso",
        data: resultado[0],
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
  static async createUser({ input }) {
    try {
      const [usuarioExistente] = await conexion.query(
        "SELECT * FROM users WHERE username = ?",
        [input.username]
      );
      if (usuarioExistente.length > 0) {
        throw new Error("El nombre de usuario ya está en uso");
      }

      const id = uuidv4();
      const passwordHash = await bcrypt.hash(input.password_hash, SALT_ROUNDS);
      const query =
        "INSERT INTO `users`(`id`, `username`, password_hash) VALUES (?,?,?)";
      const [resultado] = await conexion.query(query, [
        id,
        input.username,
        passwordHash,
      ]);

      if (resultado.affectedRows === 0)
        throw new Error("Error al crear Usuario");

      const [usuarioCreado] = await conexion.query(
        "SELECT id,username,created_at FROM users WHERE id = ?",
        [id]
      );
      return {
        success: true,
        message: "Usuario creado correctamente",
        data: usuarioCreado[0],
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
