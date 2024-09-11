import { z } from "zod";

export const supplySchema = z
  .object({
    id: z.string().optional(),
    name: z
      .string({
        required_error: "El nombre es requerido",
      })
      .min(3, "El nombre debe tener 3 caracteres como mínimo"),
    quantity: z.number().nonnegative("La cantidad no puede ser negativa"),
    unit: z.string().min(1, "La unidad no puede estar vacía"),
    category: z.string().min(1, "La categoría no puede estar vacía"),
    price: z.number().positive("El precio debe ser un número positivo"),
    supplier: z.string().optional(),
    picture: z
      .string()
      .url("Debe ser una URL válida para la imagen")
      .optional(),
    stock: z.number().optional(),
  })
  .strict();

export type Supply = z.infer<typeof supplySchema>;

export function validateSupply(data: unknown) {
  return supplySchema.safeParse(data);
}

// Esquema parcial para actualización
export const updateSupplySchema = supplySchema.partial();

// Validación parcial para actualización
export function validateUpdateSupply(data: unknown) {
  return updateSupplySchema.safeParse(data);
}
