import { NextFunction, Request, Response } from "express";
import AuthModel from "../models/authModel";

async function checkToken(req: Request, res: Response, next: NextFunction) {
  const token = req.query.token;
  if (!token)
    return res.status(400).json({ message: "No autorizado, token requerido" });

  const authDb = await AuthModel.read();
  const user = authDb.auth.find((auth) => auth.token == token);

  if (!user) return res.status(401).json({ message: "Token inválido" });

  next();
}

export default checkToken;
