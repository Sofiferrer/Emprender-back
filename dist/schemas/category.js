"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
exports.validateCategory = validateCategory;
const zod_1 = require("zod");
exports.categorySchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    name: zod_1.z
        .string({
        required_error: "El nombre es requerido",
    })
        .min(3, "El nombre debe tener 3 caracteres como mínimo"),
})
    .strict();
function validateCategory(data) {
    return exports.categorySchema.safeParse(data);
}
