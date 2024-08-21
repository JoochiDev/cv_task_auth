import z from "zod";

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string({
    invalid_type_error: "Director must be a string",
  }),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z.string().url({
    message: "invalid must be a valid url",
  }),
  genre: z.array(
    z.enum([
      "Action",
      "Comedy",
      "Adventure",
      "Horror",
      "Thriller",
      "Fantasy",
      "Sci-Fi",
      "Adventure",
      "Drama",
    ]),
    {
      required_error: "Movie genre is required",
      invalid_type_error: "Movie genre must be an array of enum genre",
    }
  ),
});

export function validateMovie(input) {
  //partial: haz que todas las propiedades de schemasMovie, sean  obligatorias todas, vas a validar todas
  return movieSchema.safeParse(input);
}

export function validateParseMovie(input) {
  //partial: haz que todas las propiedades de schemasMovie, sean opcionales y no obligatorias todas, solo las que se pase las validas
  return movieSchema.partial().safeParse(input);
}
