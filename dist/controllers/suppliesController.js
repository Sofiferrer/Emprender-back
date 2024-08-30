"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const suppliesService_1 = __importDefault(require("../services/suppliesService"));
class SuppliesController {
    static async getAll(req, res, next) {
        try {
            suppliesService_1.default.read();
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const id = await suppliesService_1.default.create(req.body);
            res.status(201).json({ message: "Ingrediente creado", id });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = SuppliesController;
