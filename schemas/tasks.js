import z from "zod";

const tasksSchema = z.object({
  title: z
    .string({
      invalid_type_error: "El título de la tarea debe ser una cadena de texto",
      required_error: "El título de la tarea es requerido",
    })
    .trim({
      message: "El título de la tarea no puede tener espacios en blanco",
    })
    .regex(/^[\p{L}\p{N}\s]+$/u, {
      message: "El título de la tarea no debe contener caracteres especiales",
    })
    .min(4, {
      message: "El titulo de la tarea debe tener al menos 4 caracteres",
    })
    .max(60, {
      message: "El titulo de la tarea debe tener como máximo 60 caracteres",
    }),
  description: z
    .string({
      invalid_type_error: "Task description must be a string",
      required_error: "Task description is required",
    })
    .min(8, {
      message: "La descripción de la tarea debe tener al menos 8 caracteres",
    }),
  status: z.enum(["pendiente", "proceso", "terminado"], {
    errorMap: () => ({
      message:
        "Estado de tarea inválido,  usar (pendiente, proceso, terminado)",
    }), // Mensaje de error personalizado
  }),
});

export function validateTask(input) {
  //partial: haz que todas las propiedades de schemasMovie, sean  obligatorias todas, vas a validar todas
  return tasksSchema.safeParse(input);
}

export function validateParseTask(input) {
  //partial: haz que todas las propiedades de schemasMovie, sean opcionales y no obligatorias todas, solo las que se pase las validas
  return tasksSchema.partial().safeParse(input);
}
