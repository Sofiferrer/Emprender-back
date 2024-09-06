"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoriesService_1 = __importDefault(require("../services/categoriesService"));
class CategoriesController {
    static async getAll(req, res, next) {
        try {
            const categories = await categoriesService_1.default.read();
            res.status(200).json({ data: categories });
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const id = await categoriesService_1.default.create(req.body);
            res.status(201).json({ message: "Categoria creada", id: id });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const id = await categoriesService_1.default.update(req.params.id, req.body);
            res.status(200).json({ message: "Categoria modificada", id: id });
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteById(req, res, next) {
        try {
            const id = await categoriesService_1.default.deleteById(req.params.id);
            res.status(200).json({ message: "Categoria eliminada", id: id });
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const category = await categoriesService_1.default.getById(req.params.id);
            res.status(200).json({ data: category });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = CategoriesController;
