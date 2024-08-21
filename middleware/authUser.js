import { SECRET_JWT_KEY } from "../utilidades/config.js";
import jwt from "jsonwebtoken";
export function authUser(req, res, next) {
  req.session = { user: null };
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }
    const data = jwt.verify(token, SECRET_JWT_KEY);

    req.session.user = data;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}
