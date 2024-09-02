import { Router } from "express";
import AuthController from "../controllers/authController";

const authRouetr = Router();

authRouetr.post("/register", AuthController.register);
authRouetr.post("/login", AuthController.login);
authRouetr.post("/logout", AuthController.logout);

export default authRouetr;
