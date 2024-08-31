import { z } from "zod";

export const supplySchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  unit: z.number(),
  category: z.string(),
  price: z.number(),
  supplier: z.string(),
  picture: z.string(),
});

export type Supply = z.infer<typeof supplySchema>;

export function validateSupply(data) {
  return supplySchema.safeParse(data);
}

// Esquema parcial para actualización
export const updateSupplySchema = supplySchema.partial();

// Validación parcial para actualización
export function validateUpdateSupply(data: unknown) {
  return updateSupplySchema.safeParse(data);
}
