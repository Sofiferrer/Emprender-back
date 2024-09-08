import { Router } from "express";
import RecipesController from "../controllers/recipesController";
import checkToken from "../middlewares/check-token";

const RecipesRouter = Router();

RecipesRouter.get("/", RecipesController.getAll);
RecipesRouter.get("/:id", RecipesController.getById);
RecipesRouter.post("/create", checkToken, RecipesController.create);
RecipesRouter.patch("/update/:id", checkToken, RecipesController.update);
RecipesRouter.delete("/delete/:id", checkToken, RecipesController.deleteById);

export default RecipesRouter;
