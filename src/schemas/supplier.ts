import { z } from "zod";

export const supplierSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, "El nombre no puede estar vacío"),
    location: z.string().min(1, "La ubicación no puede estar vacía"),
    phone: z.string().optional(),
    email: z.string().email("Debe ser un email valido").optional(),
    website: z.string().url("Debe ser una URL válida").optional(),
    category: z.string().min(1, "La categoría no puede estar vacía"),
    picture: z.string().optional(),
  })
  .strict();

export type Supplier = z.infer<typeof supplierSchema>;

// Validación completa para creación
export function validateSupplier(data: unknown) {
  return supplierSchema.safeParse(data);
}

// Esquema parcial para actualización
export const updateSupplierSchema = supplierSchema.partial();

// Validación parcial para actualización
export function validateUpdateSupplier(data: unknown) {
  return updateSupplierSchema.safeParse(data);
}
