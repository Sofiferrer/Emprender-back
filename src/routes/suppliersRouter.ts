import { Router } from "express";
import SuppliersController from "../controllers/suppliersController";

const suppliersRouter = Router();

suppliersRouter.get("/", SuppliersController.getAll);
suppliersRouter.get("/:id", SuppliersController.getById);
suppliersRouter.post("/create", SuppliersController.create);
suppliersRouter.patch("/update/:id", SuppliersController.update);
suppliersRouter.delete("/delete/:id", SuppliersController.deleteById);

export default suppliersRouter;
