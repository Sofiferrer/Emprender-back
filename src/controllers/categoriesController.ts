import { Request, Response, NextFunction } from "express";
import CategoriesService from "../services/categoriesService";

class CategoriesController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoriesService.read();
      res.status(200).json({ data: categories });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await CategoriesService.create(req.body);
      res.status(201).json({ message: "Categoria creada", id: id });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await CategoriesService.update(req.params.id, req.body);
      res.status(200).json({ message: "Categoria modificada", id: id });
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await CategoriesService.deleteById(req.params.id);
      res.status(200).json({ message: "Categoria eliminada", id: id });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoriesService.getById(req.params.id);
      res.status(200).json({ data: category });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoriesController;
