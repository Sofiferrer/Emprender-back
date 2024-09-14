import { Request, Response, NextFunction } from "express";
import SuppliesService from "../services/suppliesService";

class SuppliesController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const supplies = await SuppliesService.read(req.query);
      res.status(200).json({ data: supplies });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const supply = await SuppliesService.create(req.body);
      res.status(201).json(supply);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await SuppliesService.update(req.params.id, req.body);
      res.status(200).json({ message: "Ingrediente modificado", id: id });
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await SuppliesService.deleteById(req.params.id);
      res.status(200).json({ message: "Insumo eliminado", id: id });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const supply = await SuppliesService.getById(req.params.id);
      res.status(200).json({ data: supply });
    } catch (error) {
      next(error);
    }
  }
}

export default SuppliesController;
