import { Router } from "express";
import CategoriesController from "../controllers/categoriesController";

const CategoriesRouter = Router();

CategoriesRouter.get("/", CategoriesController.getAll);
CategoriesRouter.get("/:id", CategoriesController.getById);
CategoriesRouter.post("/create", CategoriesController.create);
CategoriesRouter.patch("/update/:id", CategoriesController.update);
CategoriesRouter.delete("/delete/:id", CategoriesController.deleteById);

export default CategoriesRouter;
