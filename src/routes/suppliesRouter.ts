import { Router } from "express";
import SuppliesController from "../controllers/suppliesController";
import checkToken from "../middlewares/check-token";

const suppliesRouter = Router();

suppliesRouter.get("/", SuppliesController.getAll);
suppliesRouter.get("/:id", SuppliesController.getById);
suppliesRouter.post("/create", checkToken, SuppliesController.create);
suppliesRouter.patch("/update/:id", checkToken, SuppliesController.update);
suppliesRouter.delete("/delete/:id", checkToken, SuppliesController.deleteById);

export default suppliesRouter;
