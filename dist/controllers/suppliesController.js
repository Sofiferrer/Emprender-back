"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const suppliesService_1 = __importDefault(require("../services/suppliesService"));
class SuppliesController {
    static async getAll(req, res, next) {
        try {
            const supplies = await suppliesService_1.default.read(req.query);
            res.status(200).json({ data: supplies });
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const supply = await suppliesService_1.default.create(req.body);
            res.status(201).json(supply);
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const updatedSupply = await suppliesService_1.default.update(req.params.id, req.body);
            res.status(200).json(updatedSupply);
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteById(req, res, next) {
        try {
            const id = await suppliesService_1.default.deleteById(req.params.id);
            res.status(200).json({ message: "Insumo eliminado", id: id });
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const supply = await suppliesService_1.default.getById(req.params.id);
            res.status(200).json({ data: supply });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = SuppliesController;
