import { Router } from "express";
import RecipesController from "../controllers/recipesController";

const RecipesRouter = Router();

RecipesRouter.get("/", RecipesController.getAll);
RecipesRouter.get("/:id", RecipesController.getById);
RecipesRouter.post("/create", RecipesController.create);
RecipesRouter.patch("/update/:id", RecipesController.update);
RecipesRouter.delete("/delete/:id", RecipesController.deleteById);

export default RecipesRouter;
