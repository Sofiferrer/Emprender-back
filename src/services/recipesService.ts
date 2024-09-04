import { v4 as uuidv4 } from "uuid";
import {
  Recipe,
  validateRecipe,
  validateUpdateRecipe,
} from "../schemas/recipe";
import RecipesModel from "../models/recipesModel";

class RecipesService {
  static async create(data: Recipe) {
    try {
      const validationResult = validateRecipe(data);
      if (!validationResult.success) {
        console.log("ERRROOORR", validationResult.error);

        const error = new Error("Validación fallida");
        error["details"] = validationResult.error.errors;
        throw error;
      }
      const id = uuidv4();
      const recipesDb = await RecipesModel.read();
      recipesDb.recipes.push({ id, ...validationResult.data });
      RecipesModel.write(recipesDb);
      return id;
    } catch (error) {
      throw error;
    }
  }

  static async read(where) {
    try {
      const { recipes } = await RecipesModel.read();

      if (!where || Object.keys(where).length === 0) {
        //si no hay querys devuelvo lista completa
        return recipes;
      }

      const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.includes(where.name)
      );

      return filteredRecipes;
    } catch (error) {
      throw error;
    }
  }

  static async update(id: string, data: Recipe) {
    try {
      const validationResult = validateUpdateRecipe(data);

      if (!validationResult.success) {
        const error = new Error("Validación fallida");
        error["details"] = validationResult.error.errors;
        throw error;
      }

      const recipe = await this.getById(id); // si la receta no existe arroja error

      const recipesDb = await RecipesModel.read();
      const updatedRecipes = recipesDb.recipes.map((recipe: Recipe) =>
        recipe.id === id ? { ...recipe, ...validationResult.data } : recipe
      );

      recipesDb.recipes = updatedRecipes;
      RecipesModel.write(recipesDb);
      return id;
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id: string) {
    try {
      const recipesDb = await RecipesModel.read();

      const recipes = recipesDb.recipes.filter(
        (recipe: Recipe) => recipe.id != id
      );

      if (recipesDb.recipes.length == recipes.length) {
        const error = new Error("Receta no encontrada");
        error["statusCode"] = 404;

        throw error;
      }

      recipesDb.recipes = recipes;

      await RecipesModel.write(recipesDb);
      return id;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id: string) {
    try {
      const { recipes } = await RecipesModel.read();

      const recipe = recipes.find((recipe: Recipe) => recipe.id === id);

      if (!recipe) {
        const error = new Error("Receta no encontrada");
        error["statusCode"] = 404;

        throw error;
      }

      return recipe;
    } catch (error) {
      throw error;
    }
  }
}

export default RecipesService;
