import z from "zod";

const tasksSchema = z.object({
  title: z.string({
    invalid_type_error: "Task title must be a string",
    required_error: "Task is required",
  }),
  description: z.string({
    invalid_type_error: "Task description must be a string",
    required_error: "Task description is required",
  }),
  status: z.string({
    invalid_type_error: "Task status must be a string",
    required_error: "Task status is required",
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
