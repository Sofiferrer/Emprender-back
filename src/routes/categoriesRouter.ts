import { Router } from "express";
import CategoriesController from "../controllers/categoriesController";
import checkToken from "../middlewares/check-token";

const CategoriesRouter = Router();

CategoriesRouter.get("/", CategoriesController.getAll);
CategoriesRouter.get("/:id", CategoriesController.getById);
CategoriesRouter.post("/create", checkToken, CategoriesController.create);
CategoriesRouter.patch("/update/:id", checkToken, CategoriesController.update);
CategoriesRouter.delete(
  "/delete/:id",
  checkToken,
  CategoriesController.deleteById
);

export default CategoriesRouter;
