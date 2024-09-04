import { z } from "zod";

export const ingredientSchema = z.object({
  supplyId: z.string(),
  quantity: z.number().positive("La cantidad debe ser un número positivo"),
});

export const recipeSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, "El nombre no puede estar vacío"),
    ingredients: z.array(ingredientSchema),
    cost: z
      .number()
      .positive("El costo debe ser un número positivo")
      .optional(),
    profit: z
      .number()
      .nonnegative("La ganancia no puede ser negativa")
      .optional(),
    portions: z.number().positive("Las porciones deben ser un número positivo"),
    portion_cost: z
      .number()
      .positive("El costo por porción debe ser un número positivo")
      .optional(),
    portion_profit: z
      .number()
      .nonnegative("La ganancia por porción no puede ser negativa")
      .optional(),
    portion_price: z
      .number()
      .positive("El precio por porción debe ser un número positivo")
      .optional(),
    sale_price: z
      .number()
      .positive("El precio de venta debe ser un número positivo")
      .optional(),
    picture: z
      .string()
      .url("Debe ser una URL válida para la imagen")
      .optional(),
  })
  .strict();

export type Recipe = z.infer<typeof recipeSchema>;

export function validateRecipe(data: unknown) {
  return recipeSchema.safeParse(data);
}

// Esquema parcial para actualización
export const updateRecipeSchema = recipeSchema.partial();

// Validación parcial para actualización
export function validateUpdateRecipe(data: unknown) {
  return updateRecipeSchema.safeParse(data);
}
