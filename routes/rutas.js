import { Router } from "express";
import { TaskController } from "../controllers/task.js";
import { userController } from "../controllers/user.js";
import { authUser } from "../middleware/authUser.js";

export const taskRouter = Router();
export const userRouter = Router();
// USUARIOS

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
userRouter.post("/logout", authUser, userController.logout);

// TAREAS
taskRouter.get("/", TaskController.getAll);

taskRouter.get("/:id", TaskController.getById);

taskRouter.post("/", TaskController.create);

taskRouter.delete("/:id", TaskController.delete);

taskRouter.patch("/:id", TaskController.update);
