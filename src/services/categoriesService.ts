import { v4 as uuidv4 } from "uuid";
import { Category, validateCategory } from "../schemas/category";
import CategoriesModel from "../models/categoriesModel";

class CategoriesService {
  static async create(data: Category) {
    try {
      const validationResult = validateCategory(data);
      if (!validationResult.success) {
        const error = new Error("Validación fallida");
        error["details"] = validationResult.error.errors;
        throw error;
      }
      const id = uuidv4();
      const categoriesDb = await CategoriesModel.read();
      categoriesDb.categories.push({ id, ...validationResult.data });
      CategoriesModel.write(categoriesDb);

      return id;
    } catch (error) {
      throw error;
    }
  }

  static async read() {
    try {
      const { categories } = await CategoriesModel.read();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  static async update(id: string, data: Category) {
    try {
      const categoriesDb = await CategoriesModel.read();
      const category = this.getById(id);
      const updatedCategories = categoriesDb.categories.map(
        (category: Category) =>
          category.id === id ? { ...category, ...data } : category
      );

      categoriesDb.categories = updatedCategories;
      CategoriesModel.write(categoriesDb);
      return id;
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id: string) {
    try {
      const categoriesDb = await CategoriesModel.read();

      const categories = categoriesDb.categories.filter(
        (category: Category) => category.id != id
      );

      if (categoriesDb.categories.length == categories.length) {
        const error = new Error("Categoria no encontrada");
        error["statusCode"] = 404;
        throw error;
      }

      categoriesDb.categories = categories;

      await CategoriesModel.write(categoriesDb);
      return id;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id: string) {
    try {
      const { categories } = await CategoriesModel.read();

      const category = categories.find(
        (category: Category) => category.id === id
      );

      if (!category) {
        const error = new Error("Categoria no encontrada");
        error["statusCode"] = 404;
        throw error;
      }

      return category;
    } catch (error) {
      throw error;
    }
  }
}

export default CategoriesService;
