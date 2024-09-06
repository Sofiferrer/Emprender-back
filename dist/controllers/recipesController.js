"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipesService_1 = __importDefault(require("../services/recipesService"));
class RecipesController {
    static async getAll(req, res, next) {
        try {
            const recipes = await recipesService_1.default.read(req.query);
            res.status(200).json({ data: recipes });
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const id = await recipesService_1.default.create(req.body);
            res.status(201).json({ message: "Receta creada", id: id });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const id = await recipesService_1.default.update(req.params.id, req.body);
            res.status(200).json({ message: "Receta modificada", id: id });
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteById(req, res, next) {
        try {
            const id = await recipesService_1.default.deleteById(req.params.id);
            res.status(200).json({ message: "Receta eliminada", id: id });
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const recipe = await recipesService_1.default.getById(req.params.id);
            res.status(200).json({ data: recipe });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = RecipesController;
