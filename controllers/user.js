import jwt from "jsonwebtoken";
import { userModel } from "../models/users.js";
import { validateUser } from "../schemas/users.js";
import { SECRET_JWT_KEY } from "../utilidades/config.js";

export class userController {
  static async login(req, res) {
    const resultUser = validateUser(req.body);
    if (!resultUser.success) {
      const errorCapture = resultUser.error.issues[0];
      return res.status(400).json({
        message: errorCapture.message,
        inputError: errorCapture.path[0],
      });
    }

    const resultado = await userModel.login({ input: resultUser.data });

    if (!resultado.success)
      return res
        .status(401)
        .json({ message: resultado.message, inputError: resultado.type_error });

    const token = jwt.sign(
      { user_id: resultado.data.id, username: resultado.data.username },
      SECRET_JWT_KEY,
      { expiresIn: "1h" }
    );
    return res
      .cookie("access_token", token, {
        httpOnly: false,
        maxAge: 1000 * 60 * 60,
      })
      .json({
        message: resultado.message,
        token: token,
        usuario: resultado.data.username,
      });
  }

  static async register(req, res) {
    const resultUser = validateUser(req.body);
    if (!resultUser.success) {
      const errorCapture = resultUser.error.issues[0];
      return res.status(400).json({
        message: errorCapture.message,
        inputError: errorCapture.path[0],
      });
    }

    const resultado = await userModel.createUser({ input: resultUser.data });
    if (!resultado.success)
      return res
        .status(400)
        .json({ message: resultado.error, inputError: resultado.type_error });
    return res
      .status(201)
      .json({ message: resultado.message, data: resultado.data });
  }

  static async logout(req, res) {
    const { user } = req.session;
    if (!user) return res.status(401).json({ message: "No estas autorizado" });
    try {
      return res
        .clearCookie("access_token")
        .json({ message: "Sesión cerrada" });
    } catch (error) {
      return res.json({ message: "No hay cookie que limpiar" });
    }
  }
}
