import { taskModel } from "../models/tasks.js";
import { validateTask, validateParseTask } from "../schemas/tasks.js";

export class TaskController {
  static async getAll(req, res) {
    const { user } = req.session;
    try {
      const resultado = await taskModel.getAll({ user_id: user.user_id });
      if (!resultado.success)
        return res.status(400).json({ message: resultado.error });

      return res.json({ data: resultado.data, usuario: user.username });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    const user_id = req.session.user.user_id;

    const resultado = await taskModel.getById({ id, user_id });

    if (!resultado.success) res.status(400).json({ message: resultado.error });

    res.json(resultado.data);
  }

  static async create(req, res) {
    const user_id = req.session.user.user_id;
    const resultValidate = validateTask(req.body);
    if (!resultValidate.success) {
      const errorCapture = resultValidate.error.issues[0];
      return res.status(400).json({
        inputError: errorCapture.path[0],
        message: errorCapture.message,
      });
    }
    const resultado = await taskModel.create({
      user_id,
      input: resultValidate.data,
    });
    if (!resultado.success) res.status(400).json({ message: resultado.error });
    res
      .status(201)
      .json({ message: "Tarea creada correctamente", data: resultado.data });
  }

  static async delete(req, res) {
    const { id } = req.params;
    const user_id = req.session.user.user_id;
    const resultado = await taskModel.delete({ id, user_id });
    if (!resultado.success)
      return res.status(400).json({ message: resultado.error });

    res.json({
      message: resultado.data,
    });
  }

  static async update(req, res) {
    const result = validateParseTask(req.body);

    if (!result.success) {
      const errorCapture = result.error.issues[0];
      return res
        .status(400)
        .json({
          message: errorCapture.message,
          inputError: errorCapture.path[0],
        });
    }

    const { id } = req.params;
    const user_id = req.session.user.user_id;

    const resultado = await taskModel.update({
      id,
      user_id,
      input: result.data,
    });

    if (!resultado.success)
      return res.status(400).json({ message: resultado.error });

    return res.json({ data: resultado.data });
  }
}
