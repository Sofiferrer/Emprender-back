"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const category_1 = require("../schemas/category");
const categoriesModel_1 = __importDefault(require("../models/categoriesModel"));
class CategoriesService {
    static async create(data) {
        try {
            const validationResult = (0, category_1.validateCategory)(data);
            if (!validationResult.success) {
                const error = new Error("Validación fallida");
                error["details"] = validationResult.error.errors;
                throw error;
            }
            const id = (0, uuid_1.v4)();
            const categoriesDb = await categoriesModel_1.default.read();
            categoriesDb.categories.push({ id, ...validationResult.data });
            categoriesModel_1.default.write(categoriesDb);
            return id;
        }
        catch (error) {
            throw error;
        }
    }
    static async read() {
        try {
            const { categories } = await categoriesModel_1.default.read();
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    static async update(id, data) {
        try {
            const categoriesDb = await categoriesModel_1.default.read();
            const category = this.getById(id);
            const updatedCategories = categoriesDb.categories.map((category) => category.id === id ? { ...category, ...data } : category);
            categoriesDb.categories = updatedCategories;
            categoriesModel_1.default.write(categoriesDb);
            return id;
        }
        catch (error) {
            throw error;
        }
    }
    static async deleteById(id) {
        try {
            const categoriesDb = await categoriesModel_1.default.read();
            const categories = categoriesDb.categories.filter((category) => category.id != id);
            if (categoriesDb.categories.length == categories.length) {
                const error = new Error("Categoria no encontrada");
                error["statusCode"] = 404;
                throw error;
            }
            categoriesDb.categories = categories;
            await categoriesModel_1.default.write(categoriesDb);
            return id;
        }
        catch (error) {
            throw error;
        }
    }
    static async getById(id) {
        try {
            const { categories } = await categoriesModel_1.default.read();
            const category = categories.find((category) => category.id === id);
            if (!category) {
                const error = new Error("Categoria no encontrada");
                error["statusCode"] = 404;
                throw error;
            }
            return category;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = CategoriesService;
