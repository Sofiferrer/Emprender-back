"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const suppliersService_1 = __importDefault(require("../services/suppliersService"));
class SuppliersController {
    static async getAll(req, res, next) {
        try {
            const suppliers = await suppliersService_1.default.read(req.query);
            res.status(200).json({ data: suppliers });
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const id = await suppliersService_1.default.create(req.body);
            res.status(201).json({ message: "Proveedor creado", id: id });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const id = await suppliersService_1.default.update(req.params.id, req.body);
            res.status(200).json({ message: "Proveedor modificado", id: id });
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteById(req, res, next) {
        try {
            const id = await suppliersService_1.default.deleteById(req.params.id);
            res.status(200).json({ message: "Proveedor eliminado", id: id });
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const supplier = await suppliersService_1.default.getById(req.params.id);
            res.status(200).json({ data: supplier });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = SuppliersController;
