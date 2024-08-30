import { Request, Response, NextFunction } from "express";
import SuppliesService from "../services/suppliesService";

class SuppliesController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      SuppliesService.read();
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await SuppliesService.create(req.body);
      res.status(201).json({ message: "Ingrediente creado", id });
    } catch (error) {
      next(error);
    }
  }
}

export default SuppliesController;
