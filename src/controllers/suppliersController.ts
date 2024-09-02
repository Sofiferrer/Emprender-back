import { Request, Response, NextFunction } from "express";
import SuppliersService from "../services/suppliersService";

class SuppliersController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const suppliers = await SuppliersService.read(req.query);
      res.status(200).json({ data: suppliers });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await SuppliersService.create(req.body);
      res.status(201).json({ message: "Proveedor creado", id: id });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await SuppliersService.update(req.params.id, req.body);
      res.status(200).json({ message: "Proveedor modificado", id: id });
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await SuppliersService.deleteById(req.params.id);
      res.status(200).json({ message: "Proveedor eliminado", id: id });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const supplier = await SuppliersService.getById(req.params.id);
      res.status(200).json({ data: supplier });
    } catch (error) {
      next(error);
    }
  }
}

export default SuppliersController;
