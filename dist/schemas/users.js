"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.userSchema = void 0;
exports.validateUser = validateUser;
exports.validateLoginUser = validateLoginUser;
const zod_1 = require("zod");
exports.userSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    name: zod_1.z
        .string({
        required_error: "El nombre es requerido",
    })
        .min(3, "El nombre debe tener 3 caracteres como mínimo"),
    email: zod_1.z
        .string({
        required_error: "El email es requerido",
    })
        .email(),
    password: zod_1.z
        .string({
        required_error: "El password es requerido",
    })
        .min(8, "El password debe tener 8 caracteres como mínimo"),
})
    .strict();
function validateUser(data) {
    return exports.userSchema.safeParse(data);
}
// Esquema parcial para actualización
exports.loginUserSchema = exports.userSchema.partial();
// Validación parcial para actualización
function validateLoginUser(data) {
    return exports.loginUserSchema.safeParse(data);
}
