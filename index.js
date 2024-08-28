import express, { json } from "express";
import { taskRouter, userRouter } from "./routes/rutas.js";
import { authUser } from "./middleware/authUser.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.disable("x-power-by");
app.use(json());
app.use(
  cors({
    // origin: 'http://localhost:5173',
    origin: (origin, callback) => {
      // Permitir cualquier origen
      callback(null, true);
    },
    credentials: true, // Permite el envío de cookies y credenciales
  })
);
app.use(cookieParser());

app.use("/api/tasks", authUser, taskRouter);
app.use("/api/users", userRouter);

const PORT = process.env.PORT ?? 1234;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
