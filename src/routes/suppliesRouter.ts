import { Router } from "express";
import SuppliesController from "../controllers/suppliesController";

const suppliesRouter = Router();

suppliesRouter.get("/", SuppliesController.getAll);
suppliesRouter.get("/:id", SuppliesController.getById);
suppliesRouter.post("/create", SuppliesController.create);
suppliesRouter.patch("/update/:id", SuppliesController.update);
suppliesRouter.delete("/delete/:id", SuppliesController.deleteById);

export default suppliesRouter;
