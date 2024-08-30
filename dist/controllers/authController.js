"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = __importDefault(require("../services/authService"));
class AuthController {
    static async register(req, res, next) {
        try {
            const token = await authService_1.default.register(req.body);
            res.status(200).json({ message: "Usuario registrado", token });
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const token = await authService_1.default.login(req.body);
            res.status(201).json({ message: "Usuario logueado", token });
        }
        catch (error) {
            next(error);
        }
    }
    static async logout(req, res, next) {
        try {
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AuthController;
