"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSupplySchema = exports.supplySchema = void 0;
exports.validateSupply = validateSupply;
exports.validateUpdateSupply = validateUpdateSupply;
const zod_1 = require("zod");
exports.supplySchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    quantity: zod_1.z.number(),
    unit: zod_1.z.number(),
    category: zod_1.z.string(),
    price: zod_1.z.number(),
    supplier: zod_1.z.string(),
    picture: zod_1.z.string(),
});
function validateSupply(data) {
    return exports.supplySchema.safeParse(data);
}
// Esquema parcial para actualización
exports.updateSupplySchema = exports.supplySchema.partial();
// Validación parcial para actualización
function validateUpdateSupply(data) {
    return exports.updateSupplySchema.safeParse(data);
}
