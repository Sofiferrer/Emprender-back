"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const recipe_1 = require("../schemas/recipe");
const recipesModel_1 = __importDefault(require("../models/recipesModel"));
class RecipesService {
    static async create(data) {
        try {
            const validationResult = (0, recipe_1.validateRecipe)(data);
            if (!validationResult.success) {
                console.log("ERRROOORR", validationResult.error);
                const error = new Error("Validación fallida");
                error["details"] = validationResult.error.errors;
                throw error;
            }
            const id = (0, uuid_1.v4)();
            const recipesDb = await recipesModel_1.default.read();
            recipesDb.recipes.push({ id, ...validationResult.data });
            recipesModel_1.default.write(recipesDb);
            return id;
        }
        catch (error) {
            throw error;
        }
    }
    static async read(where) {
        try {
            const { recipes } = await recipesModel_1.default.read();
            if (!where || Object.keys(where).length === 0) {
                //si no hay querys devuelvo lista completa
                return recipes;
            }
            const filteredRecipes = recipes.filter((recipe) => recipe.name.includes(where.name));
            return filteredRecipes;
        }
        catch (error) {
            throw error;
        }
    }
    static async update(id, data) {
        try {
            const validationResult = (0, recipe_1.validateUpdateRecipe)(data);
            if (!validationResult.success) {
                const error = new Error("Validación fallida");
                error["details"] = validationResult.error.errors;
                throw error;
            }
            const recipe = await this.getById(id); // si la receta no existe arroja error
            const recipesDb = await recipesModel_1.default.read();
            const updatedRecipes = recipesDb.recipes.map((recipe) => recipe.id === id ? { ...recipe, ...validationResult.data } : recipe);
            recipesDb.recipes = updatedRecipes;
            recipesModel_1.default.write(recipesDb);
            return id;
        }
        catch (error) {
            throw error;
        }
    }
    static async deleteById(id) {
        try {
            const recipesDb = await recipesModel_1.default.read();
            const recipes = recipesDb.recipes.filter((recipe) => recipe.id != id);
            if (recipesDb.recipes.length == recipes.length) {
                const error = new Error("Receta no encontrada");
                error["statusCode"] = 404;
                throw error;
            }
            recipesDb.recipes = recipes;
            await recipesModel_1.default.write(recipesDb);
            return id;
        }
        catch (error) {
            throw error;
        }
    }
    static async getById(id) {
        try {
            const { recipes } = await recipesModel_1.default.read();
            const recipe = recipes.find((recipe) => recipe.id === id);
            if (!recipe) {
                const error = new Error("Receta no encontrada");
                error["statusCode"] = 404;
                throw error;
            }
            return recipe;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = RecipesService;
