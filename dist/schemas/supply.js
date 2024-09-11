"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSupplySchema = exports.supplySchema = void 0;
exports.validateSupply = validateSupply;
exports.validateUpdateSupply = validateUpdateSupply;
const zod_1 = require("zod");
exports.supplySchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    name: zod_1.z
        .string({
        required_error: "El nombre es requerido",
    })
        .min(3, "El nombre debe tener 3 caracteres como mínimo"),
    quantity: zod_1.z.number().nonnegative("La cantidad no puede ser negativa"),
    unit: zod_1.z.string().min(1, "La unidad no puede estar vacía"),
    category: zod_1.z.string().min(1, "La categoría no puede estar vacía"),
    price: zod_1.z.number().positive("El precio debe ser un número positivo"),
    supplier: zod_1.z.string().optional(),
    picture: zod_1.z
        .string()
        .url("Debe ser una URL válida para la imagen")
        .optional(),
    stock: zod_1.z.number().optional(),
})
    .strict();
function validateSupply(data) {
    return exports.supplySchema.safeParse(data);
}
// Esquema parcial para actualización
exports.updateSupplySchema = exports.supplySchema.partial();
// Validación parcial para actualización
function validateUpdateSupply(data) {
    return exports.updateSupplySchema.safeParse(data);
}
