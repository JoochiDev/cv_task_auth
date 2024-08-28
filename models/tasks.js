import { conexion } from "../db/conexion.js";

export class taskModel {
  static async getAll({ user_id }) {
    try {
      const query = "SELECT * FROM tasks WHERE user_id = ?";
      const [result] = await conexion.query(query, [user_id]);
      if (result.length === 0) {
        return {
          success: true,
          data: [],
        };
      }

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  static async getById({ id, user_id }) {
    try {
      const query = "SELECT * FROM tasks WHERE id = ? AND  user_id = ?";
      const [result] = await conexion.query(query, [id, user_id]);
      if (result.length === 0) throw new Error("No existe la tarea");

      return {
        success: true,
        data: result[0],
      };
    } catch (error) {
      return {
        success: false,
        message: "Error al obtener datos",
        error: error.message,
      };
    }
  }

  static async create({ user_id, input }) {
    try {
      const query =
        "INSERT INTO `tasks`(`user_id`,`title`,`description`,`status`) VALUES (?,?,?,?)";
      const [result] = await conexion.query(query, [
        user_id,
        input.title,
        input.description,
        input.status,
      ]);

      if (result.affectedRows === 0)
        throw new Error("No se pudo crear la tarea");

      const [tareaCreado] = await conexion.query(
        "SELECT * FROM tasks WHERE id = ?",
        [result.insertId]
      );

      return {
        success: true,
        message: "Tarea creada correctamente.",
        data: tareaCreado[0],
      };
    } catch (error) {
      return {
        success: false,
        message: "Error al crear tarea",
        error: error.message,
      };
    }
  }

  static async update({ id, user_id, input }) {
    try {
      const checkQuery =
        "SELECT id, title, description, status FROM tasks WHERE id = ? AND user_id = ?";
      const [checkResult] = await conexion.query(checkQuery, [id, user_id]);

      if (checkResult.length === 0) {
        throw new Error("No hay datos");
      }
      const query =
        "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?";

      const [result] = await conexion.query(query, [
        input.title ? input.title : checkResult[0].title,
        input.description ? input.description : checkResult[0].description,
        input.status ? input.status : checkResult[0].status,
        id,
        user_id,
      ]);

      if (result.affectedRows === 0) {
        throw new Error("Fallo al actualizar, registro no encontrado");
      }

      const [taskUpdate] = await conexion.query(
        "SELECT * FROM tasks WHERE id = ?",
        [id]
      );
      return { success: true, data: taskUpdate[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async delete({ id, user_id }) {
    try {
      const checkQuery = "SELECT id FROM tasks WHERE id = ? AND user_id = ?";
      const [checkResult] = await conexion.query(checkQuery, [id, user_id]);

      if (checkResult.length === 0) {
        throw new Error("Tarea no encontrada");
      }
      const query = "DELETE FROM tasks WHERE id = ? AND user_id = ?";

      const [result] = await conexion.query(query, [id, user_id]);

      if (result.affectedRows === 0) {
        throw new Error("Fallo al eliminar, registro no encontrado");
      }

      return {
        success: true,
        data: "Tarea eliminada correctamente",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
