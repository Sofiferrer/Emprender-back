"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authModel_1 = __importDefault(require("../models/authModel"));
async function checkToken(req, res, next) {
    const token = req.query.token;
    if (!token)
        return res.status(400).json({ message: "No autorizado, token requerido" });
    const authDb = await authModel_1.default.read();
    const user = authDb.auth.find((auth) => auth.token == token);
    if (!user)
        return res.status(401).json({ message: "Token inválido" });
    next();
}
exports.default = checkToken;
