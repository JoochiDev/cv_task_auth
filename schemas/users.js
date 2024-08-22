import z from "zod";

const usersSchema = z.object({
  username: z
    .string({
      required_error: "Nombre de usuario requerido",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "El nombre de usuario no debe contener catacteres especiales",
    })
    .min(4, {
      message: "El nombre de usuario debe tener al menos 4 caracteres",
    }),
  password_hash: z
    .string({
      required_error: "El password es requerido",
    })
    .min(6, {
      message: "El password debe tener al menos 6 caracteres",
    }),
});

export function validateUser(input) {
  return usersSchema.safeParse(input);
}
