import { Request, Response, NextFunction } from "express";
import AuthService from "../services/authService";

class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await AuthService.register(req.body);
      res.status(200).json({ message: "Usuario registrado", token });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await AuthService.login(req.body);
      res.status(201).json({ message: "Usuario logueado", token });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.logout(req.query.token);
      res.status(200).json({ message: "Sesion de usuario cerrada" });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
