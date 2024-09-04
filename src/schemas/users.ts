import { z } from "zod";

export const userSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z
      .string({
        required_error: "El nombre es requerido",
      })
      .min(3, "El nombre debe tener 3 caracteres como mínimo"),
    email: z
      .string({
        required_error: "El email es requerido",
      })
      .email(),
    password: z
      .string({
        required_error: "El password es requerido",
      })
      .min(8, "El password debe tener 8 caracteres como mínimo"),
  })
  .strict();

export type User = z.infer<typeof userSchema>;

export function validateUser(data: unknown) {
  return userSchema.safeParse(data);
}

// Esquema parcial para actualización
export const loginUserSchema = userSchema.partial();

// Validación parcial para actualización
export function validateLoginUser(data: unknown) {
  return loginUserSchema.safeParse(data);
}
