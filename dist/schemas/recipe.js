"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecipeSchema = exports.recipeSchema = exports.ingredientSchema = void 0;
exports.validateRecipe = validateRecipe;
exports.validateUpdateRecipe = validateUpdateRecipe;
const zod_1 = require("zod");
exports.ingredientSchema = zod_1.z.object({
    supplyId: zod_1.z.string(),
    quantity: zod_1.z.number().positive("La cantidad debe ser un número positivo"),
});
exports.recipeSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    name: zod_1.z.string().min(1, "El nombre no puede estar vacío"),
    ingredients: zod_1.z.array(exports.ingredientSchema),
    cost: zod_1.z
        .number()
        .positive("El costo debe ser un número positivo")
        .optional(),
    profit: zod_1.z
        .number()
        .nonnegative("La ganancia no puede ser negativa")
        .optional(),
    portions: zod_1.z.number().positive("Las porciones deben ser un número positivo"),
    portion_cost: zod_1.z
        .number()
        .positive("El costo por porción debe ser un número positivo")
        .optional(),
    portion_profit: zod_1.z
        .number()
        .nonnegative("La ganancia por porción no puede ser negativa")
        .optional(),
    portion_price: zod_1.z
        .number()
        .positive("El precio por porción debe ser un número positivo")
        .optional(),
    sale_price: zod_1.z
        .number()
        .positive("El precio de venta debe ser un número positivo")
        .optional(),
    preparation: zod_1.z.string().optional(),
    hours: zod_1.z.number().positive(),
})
    .strict();
function validateRecipe(data) {
    return exports.recipeSchema.safeParse(data);
}
// Esquema parcial para actualización
exports.updateRecipeSchema = exports.recipeSchema.partial();
// Validación parcial para actualización
function validateUpdateRecipe(data) {
    return exports.updateRecipeSchema.safeParse(data);
}
