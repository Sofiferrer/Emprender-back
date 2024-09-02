import { Request, Response, NextFunction } from "express";
import RecipesService from "../services/recipesService";

class RecipesController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const recipes = await RecipesService.read(req.query);
      res.status(200).json({ data: recipes });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await RecipesService.create(req.body);
      res.status(201).json({ message: "Receta creada", id: id });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await RecipesService.update(req.params.id, req.body);
      res.status(200).json({ message: "Receta modificada", id: id });
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await RecipesService.deleteById(req.params.id);
      res.status(200).json({ message: "Receta eliminada", id: id });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const recipe = await RecipesService.getById(req.params.id);
      res.status(200).json({ data: recipe });
    } catch (error) {
      next(error);
    }
  }
}

export default RecipesController;
