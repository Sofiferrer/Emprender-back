"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSupplierSchema = exports.supplierSchema = void 0;
exports.validateSupplier = validateSupplier;
exports.validateUpdateSupplier = validateUpdateSupplier;
const zod_1 = require("zod");
exports.supplierSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1, "El nombre no puede estar vacío"),
    location: zod_1.z.string().min(1, "La ubicación no puede estar vacía"),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().email("Debe ser un email valido").optional(),
    website: zod_1.z.string().url("Debe ser una URL válida").optional(),
    category: zod_1.z.string().min(1, "La categoría no puede estar vacía"),
    picture: zod_1.z.string().url("Debe ser una URL válida para la imagen").optional(),
});
// Validación completa para creación
function validateSupplier(data) {
    return exports.supplierSchema.safeParse(data);
}
// Esquema parcial para actualización
exports.updateSupplierSchema = exports.supplierSchema.partial();
// Validación parcial para actualización
function validateUpdateSupplier(data) {
    return exports.updateSupplierSchema.safeParse(data);
}
