import { Router } from "express";
import SuppliesController from "../controllers/suppliesController";

const suppliesRouter = Router();

suppliesRouter.get("/", SuppliesController.getAll);
suppliesRouter.post("/create", SuppliesController.create);

export default suppliesRouter;
