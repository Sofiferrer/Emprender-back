import { Router } from "express";
import SuppliersController from "../controllers/suppliersController";
import checkToken from "../middlewares/check-token";

const suppliersRouter = Router();

suppliersRouter.get("/", SuppliersController.getAll);
suppliersRouter.get("/:id", SuppliersController.getById);
suppliersRouter.post("/create", checkToken, SuppliersController.create);
suppliersRouter.patch("/update/:id", checkToken, SuppliersController.update);
suppliersRouter.delete(
  "/delete/:id",
  checkToken,
  SuppliersController.deleteById
);

export default suppliersRouter;
