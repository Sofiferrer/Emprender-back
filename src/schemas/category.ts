import { z } from "zod";

export const categorySchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z
      .string({
        required_error: "El nombre es requerido",
      })
      .min(3, "El nombre debe tener 3 caracteres como mínimo"),
  })
  .strict();

export type Category = z.infer<typeof categorySchema>;

export function validateCategory(data) {
  return categorySchema.safeParse(data);
}
